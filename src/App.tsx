import {Canvas} from './components/Canvas/Canvas.tsx'
import "./App.css"
import React from 'react'


type AppProps = {
  image:string
}

export const App: React.FC<AppProps> = ({image}) =>{


  return (
    <>
      <div className='app_container'>
        <Canvas image={image} />
      </div>
    </>
  )
}

export default App
