import {Canvas} from './components/Canvas/Canvas.tsx'
import "./App.css"
import React from 'react'


type AppProps = {
  imageUrl:string | undefined
  bounding: number[][] | undefined
}

export const App: React.FC<AppProps> = ({imageUrl,bounding}) =>{

  return (
    <>
      <div className='app_container'>
        <Canvas key={imageUrl} imageProp={imageUrl} bounding={bounding} />
      </div>
    </>
  )
}


