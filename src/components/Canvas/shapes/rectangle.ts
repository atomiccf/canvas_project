export const drawRect = (context:CanvasRenderingContext2D | null, x:number, y:number, width:number, height:number) => {
    if (context) {
        context.beginPath()
        context.rect(x, y, width, height)
        context.stroke()
        context.closePath()
    }

}