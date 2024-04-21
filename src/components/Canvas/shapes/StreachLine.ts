export const drawStretchingLine = (context: CanvasRenderingContext2D | null, x1: number, y1: number, x2: number, y2: number, stretchFactor: number) => {
    if (context) {
        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2;
        const stretchedX2 = midX + stretchFactor * (x2 - midX);
        const stretchedY2 = midY + stretchFactor * (y2 - midY);

        context.beginPath();
        context.strokeStyle = 'black';
        context.lineWidth = 1;
        context.moveTo(x1, y1);
        context.lineTo(stretchedX2, stretchedY2);
        context.stroke();
        context.closePath();
    }
}