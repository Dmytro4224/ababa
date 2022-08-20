const { Pool, Client } = require('pg')
import { Injectable } from '@nestjs/common';

@Injectable()
export class dbProvider {
    private pool = null;

    constructor() {
       this.pool = new Pool({
           user: 'ababa',
           host: '85.10.203.132',
           database: 'ababa_movie',
           password: 'b*893aBab@m0v1eK2',
           port: 5432,
        })
    }

    public async execute(query: string, pars: Array<any>): Promise<any> {

        return new Promise((resolve, reject) => {
            this.pool.connect((err, client, release) => {
                if (err) {
                    reject(err.stack);
                }
                client.query(`${query}`, pars, (err, result) => {
                    release();
                    if (err) {
                        reject(err.stack);
                    }

                    if (typeof result === 'undefined'
                        || result === null
                        || typeof result.rows === 'undefined'
                        || result.rows === null) {
                        resolve([]);
                    } else { resolve(result.rows); }
                })
            });
        });
    }
}
