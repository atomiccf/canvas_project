import React, { useState} from 'react';
import  { Stage, Layer, Line, Rect, Image } from 'react-konva';
import useImage from 'use-image';
import Konva from "konva";


type Point = number;
type Line = Point[];
type Rect = { x: number; y: number; width: number; height: number };

type CanvasProps = {

}

export const Canvas: React.FC = () => {
    const [lines, setLines] = useState<Line[]>([]);
    const [rects, setRects] = useState<Rect[]>([]);
    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const [mode, setMode] = useState<'line' | 'rect'>('line');


    const [image] = useImage('../src/assets/react.svg');

    const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
        setIsDrawing(true);
        const stage = e.target.getStage();
        if (stage) {
            const pos = stage.getPointerPosition();
            if (mode === 'line' && pos) {
                setLines([...lines, [pos.x, pos.y]]);
            } else if (mode === 'rect' && pos) {
                setRects([...rects, {x: pos.x, y: pos.y, width: 0, height: 0}]);
            }
        }
    };

    const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
        if (!isDrawing) return;
        const stage = e.target .getStage();
        if (stage) {
            const pos = stage.getPointerPosition();
            const point = stage.getPointerPosition();
            const lastLine = lines[lines.length - 1];
            const lastRect = rects[rects.length - 1];
            if (mode === 'line' && pos) {
                setLines(lines => {

                    return [
                        ...lines.slice(0, -1),
                        [lastLine[0], lastLine[1], pos.x, pos.y]
                    ];
                });
            } else if (mode === 'rect' && point) {
                lastRect.width = point.x - lastRect.x;
                lastRect.height = point.y - lastRect.y;
                rects.splice(rects.length - 1, 1, lastRect);
                setRects(rects.concat());
            }
        }




    };

    const handleMouseUp = () => {
        setIsDrawing(false);
    };

    return (
        <>
                <button onClick={() => setMode('line')}>Line</button>
                <button onClick={() => setMode('rect')}>Rect</button>
                <Stage width={640} height={640} onMouseDown={handleMouseDown} onMousemove={handleMouseMove}
                       onMouseup={handleMouseUp}>
                    <Layer>
                        <Image image={image} />
                    </Layer>
                    <Layer>
                        {lines.map((line, i) => <Line key={i} points={line} stroke="black"/>)}
                        {rects.map((rect, i) => <Rect key={i} x={rect.x} y={rect.y} width={rect.width}
                           height={rect.height} stroke="black"/>)}
                    </Layer>
                </Stage>
        </>
    );
};
