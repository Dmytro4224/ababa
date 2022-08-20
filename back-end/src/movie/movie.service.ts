import { Injectable, Res } from '@nestjs/common';
import { dbProvider } from '../dbProvider/db.service';
import { v4 as uuidv4 } from 'uuid';

export interface iMovie {
    id?: number;
    /**������������� ������ */
    hash?: uuidv4;
    /**������� ������ */
    ownerid?: number;
    /**����� ������ */
    name?: string;
    /**���� ������ */
    description?: string;
    /**�������� ������ */
    thumbnail?: string;
    /**��������� �� ������ ������ */
    preview?: string;
    /**������ - ���./����. ������ */
    status?: boolean;
    /**���� ��������� ������ */
    date?: Date
}


@Injectable()
export class MovieProvider {

    //---------CRUD---------------

    /**
     * �������� �������� ��'����
     * */
    public static async Get(movieHsah: uuidv4, userHash: uuidv4): Promise<iMovie> {

        let db: dbProvider = new dbProvider();
        let rows = await db.execute(`select m.* from obj_movies m 
                                    join obj_users u on u.id=m.ownerid and u.hash=$1
                                    where m.hash =$2;`, [userHash,movieHsah]);

        if (rows.length != 0) {
            return MovieProvider.fillDataRow(rows[0]);
        }

        return null;
    }

  /**
   * �������� ���
   * @param movieHsah - ������������� ������
   * @param userHash - ������� ������
   */
    public static async Detele(movieHsah: uuidv4, userHash: uuidv4): Promise<iMovie> {
        let db: dbProvider = new dbProvider();
        let rows = await db.execute(`select * from obj_movies_delete($1,$2);`, [userHash, movieHsah]);

        if (rows.length != 0) {
            return MovieProvider.fillDataRow(rows[0]);
        }

        return null;
    }

    /**
     * ������ ����� ����� ��� ���
     * @param name - ����� ������
     * @param description - ���� ������
     * @param thumbnail - ��������� �� �������
     * @param preview - ��������� �� ������
     */
    public static async Add(userHash: uuidv4, name: string, description: string, thumbnail: string, preview: string): Promise<iMovie> {

        let db: dbProvider = new dbProvider();

        console.log(name,description, thumbnail, preview);

        let query: string = `select * from obj_movies_add($1, $2, $3, $4, $5);`;
        let rows = await db.execute(query, [userHash, name, description, thumbnail, preview]);

        if (rows.length == 0) {
            throw new Error("movieProvider=>Add=>exec obj_movies_add error");
        }

        return MovieProvider.fillDataRow(rows[0]);
    }
     //---------CRUD---------------

     /**
     * ���������� ��������� ������� � �����
     * @param row
     */
    public static fillDataRow(row: any): iMovie {

        let item: iMovie = { id: -1 };

        try {
            item.id = row.id;
            item.hash = row.hash;
            item.ownerid = row.ownerid;
            item.name = row.name;
            item.description = row.description;
            item.thumbnail = row.thumbnail;
            item.preview = row.preview;
            item.status = row.status;
            item.date = row.date;
        }
        catch {
            return null;
        }

        return item;
    }

    /**
     * �������� ������ ������ ��� ����� userHash
     * @param userHash - uuid ������������� �����
     * @param pageIndex - �������
     * @param pageSize - �-��� �������� �� �������
     * @param onlyActive - ���� = true, ������ ������� ����� ������ ������
     */
    public static async LoadList(userHash: uuidv4, pageIndex: number = 1, pageSize: number = 50, onlyActive: boolean = true):
        Promise<iMovie[]>{
        let db: dbProvider = new dbProvider();

        let query: string = `select * from obj_movie_load($1, $2, $3, $4);`;
        let rows = await db.execute(query, [userHash, pageIndex, pageSize, onlyActive]);

        let result: iMovie[] = [];

        for (let i = 0; i < rows.length; i++) {
            result.push(MovieProvider.fillDataRow(rows[i]));
        }

        return result;
    }

   
}

