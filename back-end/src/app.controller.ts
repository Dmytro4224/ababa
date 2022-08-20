import { Controller, Get, Param,  ExecutionContext, Injectable, UseInterceptors,  CanActivate, UseGuards, Post, Body, ParseUUIDPipe, All, Delete } from '@nestjs/common';
import { AppService } from './app.service';
import { catchError, map, Observable, tap, throwError } from "rxjs";
import { authProvider } from './auth/auth.service';
import { userProvider } from './user/user.service';

import { MovieProvider } from './movie/movie.service';
import { iMovie } from './movie/movie.service';

export class LoginModel {
    name?: string;
    login: string;
    password: string;
}

//----------------public methods-------------------//
@Controller()
/**реалізація публічних методів*/
export class AppController {
    /* readme buffer html */
    static readmeBuffer: string = '';

    constructor(private readonly appService: AppService) {}

    /**api welcome screen*/
    @Get()
  async getHello(): Promise<string> {
      AppController.readmeBuffer = await this.appService.sayHello(AppController.readmeBuffer);
      return AppController.readmeBuffer;
  }
    /**create new user method*/
    @Post('/auth/signin')
    async signin(@Body() loginModel: LoginModel)  {
        let loginResult = await authProvider.Login(loginModel.login, loginModel.password);

        if (loginResult.sessionToken == null) {
            return {
                statusCode: 403,
                data: loginResult.loginMessage
            };
        }

        return {
            statusCode: 200,
            data: loginResult
        }; 
    }

    /**login*/
    @Post('/auth/signup')
    async signup(@Body() loginModel: LoginModel) {
        let createUserResult = 
        await userProvider.Add(loginModel.name, loginModel.login, loginModel.password);


        if (createUserResult.id == -1) {
                return {
                    statusCode: 403,
                    data: "user already exist"
                }; 
        }

        createUserResult.id = null;
        createUserResult.authhash = null;

        return {
            statusCode: 200,
            data: createUserResult
        }; 
    }

    /**log out*/
    @Get('/auth/signout/:userSessionToken/:userHash')
    async signout(
        @Param('userSessionToken', new ParseUUIDPipe()) userSessionToken,
        @Param('userHash', new ParseUUIDPipe()) userHash    ) {

        let logOutResult = await authProvider.logOut(userSessionToken, userHash);

        return {
            statusCode: 200,
            data: { isLogOut: logOutResult } 
        };
    }
}
//----------------public methods-------------------//


//----------------AuthGuard-------------------//
/** моделька для зберігання кешу буферу сесій авторизації */
interface iAuthGuardAuthBuffer {
    checkDate: Date,
    isValid: boolean
}

/**
 * Перевірка, чи можна визивати приватні методи
 * */
@Injectable()
export class AuthGuard implements CanActivate {

  canActivate(
        context: ExecutionContext,
  ):  boolean| Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const params = request.params;

      if (!this.isUUID(params.userSessionToken)
          || !this.isUUID(params.userHash)) {
          return false;
      }

      let loginStatus = this.checkSession(
          params.userSessionToken,
          params.userHash);

        return loginStatus;
    }

    /**словник для кешу сесій авторизації*/
    private authData: Object = new Object();
    /**
     * Перевіряємо валідність пари ключ сесії+юзер
     * @param userSessionToken
     * @param userHash
     */
    private async checkSession(userSessionToken: string, userHash: string): Promise<boolean> {

        let key = `${userSessionToken}-${userHash}`;
        let result: boolean = false; 
        if (typeof this.authData[key] === 'undefined') {
            result = await authProvider.isLogin(userSessionToken, userHash);
            console.log('AuthGuard check in DB');

            let __buff: iAuthGuardAuthBuffer = {
                checkDate: new Date(),
                isValid: result
            }; 

            this.authData[key] = __buff;
        }
        else {

            let now = Date.now();
            let diff = Math.abs(Math.floor(((now - this.authData[key].checkDate) / 1000) / 60));
            console.log('date diff', diff);

            if (diff >= 5 && this.authData[key].isValid) {
                result = await authProvider.isLogin(userSessionToken, userHash);
                console.log('AuthGuard check in DB after 5 min');
                this.authData[key].isValid = result;
            }
        }

        return this.authData[key].isValid;
    }

    isUUID (str) {
        const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
        return regexExp.test(str);
    }
}
//----------------AuthGuard-------------------//


//----------------private methods-------------------//
/**Приватні методи */
@Controller('u/:userSessionToken/:userHash')
@UseGuards(AuthGuard)
export class PrivateController  {
    constructor(private readonly appService: AppService
    ) {}

    /**
     * Отримати список мовіків користувача userHash
     * @param userSessionToken
     * @param userHash
     */
    @Get()
    async myMovies(
        @Param('userSessionToken', new ParseUUIDPipe()) userSessionToken, 
        @Param('userHash', new ParseUUIDPipe()) userHash, 
    ): Promise<any> {

        let moviesList = [];
        try {
            moviesList = await MovieProvider.LoadList(userHash, 1, 250, true);
        } catch(erro) {
            return {
                statusCode: 500,
                statusMessage: erro,
                data: []
            };
        }

        moviesList.forEach(item => {
            item=this.clearPersonalData(item)
        });

        return {
            statusCode: 200,
                data: moviesList
        };
    }

    @Post()
    async addMovies(
        @Param('userSessionToken', new ParseUUIDPipe()) userSessionToken,
        @Param('userHash', new ParseUUIDPipe()) userHash,
        @Body() movieModel: iMovie
        
    ): Promise<any> {

        if (movieModel === null
            || typeof movieModel.name === 'undefined'
            || movieModel.name === null
        ) {
            return {
                statusCode: 422,
                statusMessage: `"name" field value is required`
            };
        }

        let addResult: iMovie = null;
        try {
            addResult = await MovieProvider.Add(
                userHash,
                movieModel.name,
                movieModel.description ?? "",
                movieModel.thumbnail ?? "",
                movieModel.preview ?? "");
        } catch (erro) {
            return {
                statusCode: 500,
                statusMessage: erro
            };
        }


        return {
            statusCode: 200,
            data: this.clearPersonalData(addResult)
        };
    }

    @Get('movie/:movieHash')
    async movieInfo(
        @Param('userSessionToken', new ParseUUIDPipe()) userSessionToken,
        @Param('userHash', new ParseUUIDPipe()) userHash,
        @Param('movieHash', new ParseUUIDPipe()) movieHash
    ): Promise<any> {

        let result = null;
        try {
            result = await MovieProvider.Get(movieHash,userHash);
        } catch (erro) {
            return {
                statusCode: 500,
                statusMessage: erro,
                data: []
            };
        }

        return {
            statusCode: 200,
            data: this.clearPersonalData(result)
        };
    }

    @Delete('movie/:movieHash')
    async movieDelete(
        @Param('userSessionToken', new ParseUUIDPipe()) userSessionToken,
        @Param('userHash', new ParseUUIDPipe()) userHash,
        @Param('movieHash', new ParseUUIDPipe()) movieHash
    ): Promise<any> {

        let result = null;
        try {
            result = await MovieProvider.Detele(movieHash, userHash);
        } catch (erro) {
            return {
                statusCode: 500,
                statusMessage: erro,
                data: []
            };
        }

        if (result.status) {
            return {
                statusCode: 403,
                data: {
                    isRemoved: !result.status
                }
            };
        }
        else {
            return {
                statusCode: 403,
                data: {
                    isRemoved: !result.status
                }
            };
        }

     
    }

    clearPersonalData(movie: iMovie): iMovie {
        movie.id = null;
        movie.ownerid = null;
        return movie;
    }
}
//----------------private methods-------------------//