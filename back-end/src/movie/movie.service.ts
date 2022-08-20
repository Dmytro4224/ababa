import { Injectable, Res } from '@nestjs/common';
import { dbProvider } from '../dbProvider/db.service';
import { v4 as uuidv4 } from 'uuid';

export interface iMovie {
    id?: number;
    /**ідентифікатор фільму */
    hash?: uuidv4;
    /**власник фільму */
    ownerid?: number;
    /**назва фільму */
    name?: string;
    /**опис фільму */
    description?: string;
    /**картинка фільму */
    thumbnail?: string;
    /**посилання на превью фільму */
    preview?: string;
    /**статус - вкл./викл. фільму */
    status?: boolean;
    /**дата створення фільму */
    date?: Date
}


@Injectable()
export class MovieProvider {

    //---------CRUD---------------

    /**
     * Отримати занчення об'єкту
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
   * Видалити кіно
   * @param movieHsah - ідентифікатор фільму
   * @param userHash - власник фільму
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
     * Додати новий запис про кіно
     * @param name - назва фільму
     * @param description - опис фільму
     * @param thumbnail - посилання на малюнок
     * @param preview - посилання на превью
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
     * Спробувати перегнати датаров в класс
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
     * Отримати список фільмів для юзера userHash
     * @param userHash - uuid ідентифікатор юзера
     * @param pageIndex - сторінка
     * @param pageSize - к-сть елементів на сторінці
     * @param onlyActive - якщо = true, будуть показані тільки активні записи
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

