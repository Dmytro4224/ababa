import Cookies from 'js-cookie'

const authCookieName = 'AUTH';

export const getToken = () => {
  const cookie = Cookies.get(authCookieName) || null;
  return cookie;
}

export const setToken = (token: string) => {
  Cookies.set(authCookieName, token, { path: '/' });
}

export const removeToken = () => {
  Cookies.remove(authCookieName);
}
