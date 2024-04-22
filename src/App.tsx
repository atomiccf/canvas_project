import {Canvas} from './components/Canvas/Canvas.tsx'
import "./App.css"
import React from 'react'


type AppProps = {
  image:string
  bounding: [number, number, number, number] | undefined
}

export const App: React.FC<AppProps> = ({image,bounding}) =>{


  return (
    <>
      <div className='app_container'>
        <Canvas image={image} bounding={bounding} />
      </div>
    </>
  )
}

export default App
