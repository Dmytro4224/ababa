
export const fetchData = async <T>(url: string, init?: RequestInit) => {
  const response = await fetch(url, init);
  const json = await response.json();
  return <T>json;
}
