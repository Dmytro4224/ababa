import { Injectable, Res } from '@nestjs/common';
import { dbProvider } from '../dbProvider/db.service';
import { v4 as uuidv4 } from 'uuid';
import { iUser } from '../user/user.service';
import { userProvider } from '../user/user.service';
const { createHash } = require('crypto');

export interface iAuth {
    id?: number;
    userid?: string;
    token?: uuidv4;
    status?: boolean;
    date?: Date
}

export interface loginData {
    name?: string;
    sessionToken?: uuidv4;
    userToken?: uuidv4;
    loginMessage?: string;
}

@Injectable()
export class authProvider {

    public static fillDataRow(row: any): iAuth {

        let item: iAuth = { id: -1 };

        try {
            item.id = row.id;
            item.userid = row.userid;
            item.token = row.token;
            item.status = row.status;
            item.date = row.date;
           
        }
        catch {
            return null;
        }

        return item;
    }

    /**
     * Перевірити чи дійний токен authToken для юзера userHash
     * @param authToken
     * @param userHash
     */
    public static async isLogin(sessionToken: uuidv4, userHash: uuidv4): Promise<boolean> {


        let db: dbProvider = new dbProvider();
        let rows = await db.execute("select * from auth_tokens_isExist($1,$2)", [userHash, sessionToken]);

        if (rows.length == 0) {
            return false;
        }
        return rows[0].isvalid;
    }


    public static async logOut(sessionToken: uuidv4, userHash: uuidv4): Promise<boolean> {


        let db: dbProvider = new dbProvider();
        let rows = await db.execute("select * from auth_tokens_drop($1,$2)", [userHash, sessionToken]);

        if (rows.length == 0) {
            return true;
        }
        return !rows[0].isvalid;
    }

    /**
     * Спробувати увійти в систему
     * @param login
     * @param pwdSha
     */
    public static async Login(login: string, pwdSha: string): Promise<loginData> {

        let authhash: string = createHash('sha256').update(`${login}${pwdSha}`).digest('hex');

        //check user
        let result: iUser = await userProvider.GetByAuthToken(authhash);

        if (result === null) {
            return {
                loginMessage:"user not found",
            }
        }

        //register session token
        let db: dbProvider = new dbProvider();

        let query: string = `select * from auth_tokens_get($1);`;
        let rows = await db.execute(query, [authhash]);

        if (rows.length == 0) {
            return {
                loginMessage: "user not found",
            }
        }

        return {
            sessionToken: rows[0].token,
            loginMessage: "sussess",
            name: result.name,
            userToken: result.hash
        };

    }

}

