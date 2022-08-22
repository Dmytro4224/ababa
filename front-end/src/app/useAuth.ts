import Cookies from 'js-cookie';

const authCookieName = 'AUTH';

export interface IToken {
  sessionToken: string;
  userToken: string;
}

export const getToken = () => {
  const cookie = Cookies.get(authCookieName) || null;
  if (cookie !== null) {
    const parts = cookie.split('/');
    if (parts.length === 2) {
      const token: IToken = {
        sessionToken: parts[0],
        userToken: parts[1]
      };
      return token;
    }
  }
  return null;
}

export const setToken = (sessionToken: string, userToken: string) => {
  Cookies.set(authCookieName, `${sessionToken}/${userToken}`, { path: '/' });
}

export const removeToken = () => {
  Cookies.remove(authCookieName);
}
