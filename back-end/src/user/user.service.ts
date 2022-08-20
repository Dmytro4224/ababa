import { Injectable, Res } from '@nestjs/common';
import { dbProvider } from '../dbProvider/db.service';
import { v4 as uuidv4 } from 'uuid';
const { createHash } = require('crypto');


export interface iUser {
    id?: number;
    hash?: uuidv4;
    name?: string;
    authhash?: string;
    status?: boolean;
    date?: Date
}



@Injectable()
export class userProvider {
   
    //---------CRUD---------------

    public static async GetByAuthToken(authhash: string): Promise<iUser> {
        let db: dbProvider = new dbProvider();

        let query: string = `select * from obj_users where authhash=$1;`;
        let rows = await db.execute(query, [authhash]);
        console.log('rows', rows)
        if (rows.length == 0) {
            return null;
        }

        return userProvider.fillDataRow(rows[0]);

    }

    /**
     * Отримати занчення об'єкту
     * */
    public static async Get(userHash: uuidv4): Promise<iUser> {
        let db: dbProvider = new dbProvider();
        let rows = await db.execute("select * from obj_users where hash = $1", [userHash]);

        if (rows.length != 0) {
            null;
        }

        return userProvider.fillDataRow(rows[0]);
    }

     /**
      * Додати юзера
      * @param name - ім'я
      * @param login - логін
      * @param pwdSha - sha256 від паролю
      */
    public static async Add(
        name: string,
        login: string,
        pwdSha: string): Promise<iUser> {

        let authhash: string = createHash('sha256').update(`${login}${pwdSha}`).digest('hex');

        let db: dbProvider = new dbProvider();

        let query: string = `select * from obj_users_add($1, $2);`;
        let rows = await db.execute(query, [name, authhash]);

        if (rows.length == 0) {
            //console.log("userProvider=>Add=>exec obj_users_add error");
            //throw new Error("userProvider=>Add=>exec obj_users_add error");

            return {
                id:-1
            }

        }
        console.log('rows[0]', rows)
        return userProvider.fillDataRow(rows[0]);
    }
     //---------CRUD---------------


    /**
 * Спробувати перегнати датаров в класс
 * @param row
 */
    public static fillDataRow(row: any): iUser {
        let item: iUser = { id: -1 };
        
            item.id = row.id;
            item.hash = row.hash;
            item.name = row.name;
            item.authhash = row.authhash;
            item.status = row.status;
            item.date = row.date;

        return item;
    }
   
}

