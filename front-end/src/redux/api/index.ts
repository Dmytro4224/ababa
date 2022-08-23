import { IToken } from '../../app/useAuth';

export interface IApiResponse<T> {
  statusCode: number;
  data: T;
}

export interface IDataRequest { }

export interface IApiRequest<T extends IDataRequest | undefined> {
  token: IToken;
  data?: T;
}

export const tokenizeUrl = (body: IToken, ...args: string[]) => `/u/${body.sessionToken}/${body.userToken}${args.join('')}`;
