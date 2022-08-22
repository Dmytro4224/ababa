
export const fetchData = async <T>(url: string, init?: RequestInit) => {
  //@ts-ignore
  return {
    statusCode: 200,
    statusMessage: 'success',
    //@ts-ignore
    data: data[url]
  } as T
  //const response = await fetch(url, init);
  //const json = await response.json();
  //return <T>json;
}


const data = {
  '/login': {

  },
  '/movies': [{
    id: 1,
    name: 'Movie 1',
    title: 'Title 1'
  },
  {
    id: 2,
    name: 'Movie 2',
    title: 'Title 2'
  },
  {
    id: 3,
    name: 'Movie 3',
    title: 'Title 4'
  },
  {
    id: 4,
    name: 'Movie 4',
    title: 'Title 4'
  },
  {
    id: 5,
    name: 'Movie 5',
    title: 'Title 5'
  },
  ],
  '/movies/1': {
    id: 1,
    name: 'Movie 1',
    title: 'Title 1',
    description: 'sdfsfksd sdf sd klfskdlfk sldkflsdk flskf;lskdf;lksd'
  },
  '/add': {
    id: 11,
    name: 'Movie 11',
    title: 'Title 11',
    description: 'sdfsfksd sdf sd klfskdlfk sldkflsdk flskf;lskdf;lksd'
  }
}
