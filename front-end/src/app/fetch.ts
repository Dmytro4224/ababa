
export const fetchData = async <T>(url: string, method: 'GET' | 'POST' = 'GET', body?: any) => {
  const init = {
    method,
    body
  };
  if (method !== 'GET') {
    init.body = JSON.stringify(body);
  }
  const response = await fetch(`http://localhost:3000${url}`, init);
  const json = await response.json();
  return <T>json;
}
