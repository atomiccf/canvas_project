import { MouseEventHandler, useEffect, useRef, useState } from 'react'
import styles from './Canvas.module.css'
import {drawLine} from './shapes/line.ts'
import {drawRect} from './shapes/rectangle.ts'

import React from "react";
type CanvasProps = {
    image?: string ;
}

export const Canvas:React.FC<CanvasProps> = ({image}) => {

    const canvas = useRef<HTMLCanvasElement>(null)

    const [isDrawing, setIsDrawing] = useState(false)
    const [drawingMode, setDrawingMode] = useState('')
    const [isLoad, setIsLoad] = useState(false)
    const [x, setX] = useState<number>(0)
    const [y, setY] = useState<number>(0)

    const draw = () => {
      const context = canvas.current!.getContext('2d')
      if (context) {
        const img = new Image()
        img.onload = function () {
          context?.drawImage(img, 0, 0, 640, 640)
          setIsLoad(true)
          /*if (bounding.length === 4) {
              context.strokeRect(...bounding)
          }*/
        }
        img.src = `${image}`
      }
    }



    const mouseDown: MouseEventHandler<HTMLCanvasElement> = (e) => {
        const canvasOffset = canvas.current!.getBoundingClientRect();
        const canvasX = Math.round(e.clientX - canvasOffset?.left) // Subtract the 'left' of the canvas
        const canvasY = Math.round(e.clientY - canvasOffset?.top)

        setX(canvasX)
        setY(canvasY)
        setIsDrawing(true)
    }
  useEffect(() => {
    draw()
  }, [x,y])
    const mouseMove: MouseEventHandler<HTMLCanvasElement> = (e) => {
        const context = canvas.current!.getContext('2d')
        const canvasOffset = canvas.current!.getBoundingClientRect();
        if (!isDrawing || !isLoad) return

        const newX = Math.round(e.clientX - canvasOffset?.left) // Subtract the 'left' of the canvas
        const newY = Math.round(e.clientY - canvasOffset?.top)
        context!.clearRect(0, 0, canvas.current!.width, canvas.current!.height); // Clear the canvas
        switch (drawingMode) {
            case 'line':
                drawLine(context, x, y, newX, newY)
                break
              case 'rectangle':
               drawRect(context, x, y, newX - x, newY - y)
              break
        }
    }

    const mouseUp = () => {
        if (!isDrawing) return
        setIsDrawing(false)
    }

    return (
        <>
          <div>
            <div className={styles.toolbar}>
              <button
                onClick={() => {
                  setDrawingMode('line')
                }}>
                Line
              </button>
              <button
                onClick={() => {
                  setDrawingMode('rectangle')
                }}>
                Rect
              </button>
            </div>
            <canvas onMouseDown={mouseDown} onMouseMove={mouseMove} onMouseUp={mouseUp} id="canvas" width={'640px'}
                    height={'640px'} ref={canvas!}></canvas>
          </div>

        </>

    )
}