import { useEffect } from 'react'

export interface IHomePage {
}

export const HomePage = (props: IHomePage) => {
  
  useEffect(() => {
    console.log('HOME PAGE', Date.now());
  }, []);

  return (
    <div>
      <h1>This is the Home Page</h1>
    </div>
  )
}
