export const drawLine = (context:CanvasRenderingContext2D | null, x1:number, y1:number, x2:number, y2:number) => {

    if (context) {
        context.beginPath()
        context.strokeStyle = 'black'
        context.lineWidth = 1
        context.moveTo(x1, y1)
        context.lineTo(x2, y2)
        context.stroke()
        context.closePath()
    }

}
