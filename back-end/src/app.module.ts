import { Module } from '@nestjs/common';
import { AppController,PrivateController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [],
    controllers: [AppController, PrivateController],
    providers: [AppService],
})
export class AppModule {}
