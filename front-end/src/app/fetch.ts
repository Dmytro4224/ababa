import {appSettings} from "./settings";

export const fetchData = async <T>(url: string, method: 'GET' | 'POST' = 'GET', body?: any) => {
  const init = {
    method,
    body,
    headers: {
      "content-type": "application/json; charset=utf-8"
    }
  };
  if (method !== 'GET') {
    init.body = JSON.stringify(body);
  }
  const response = await fetch(`${appSettings.apiEndpoint}${url}`, init);
  const json = await response.json();
  return <T>json;
}
