import { Injectable } from '@nestjs/common';
import { readFileSync, promises as fsPromises } from 'fs';
import { join } from 'path';

@Injectable()
export class AppService {

    async sayHello(buffer): Promise<string> {

        let content = buffer;
        if (buffer.length < 3) {
            buffer = await this.asyncReadFile('readme.html');
            content = buffer;
            console.log('AppService.buffer reload');
        }
        return content;

    }

        async asyncReadFile(filename: string) {
            try {
                const result = await fsPromises.readFile(
                    join(__dirname, filename),
                    'utf-8',
                );
                                return result;
            } catch (err) {
                console.log(err);
                return 'Something went wrong'
            }
        }
}
