import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Group, Layer, Line} from "react-konva";

const Brush = ({mode, eventsHandler}) => {
    const [lines, setLines] = useState([]);
    const isDrawing = useRef(false);
    const handleMouseDown = useCallback((event) => {
        isDrawing.current = true;
        const {offsetX, offsetY} = event.evt;
        setLines([...lines, {
            points: [offsetX, offsetY],
            color: ((mode !== true && mode !== false && mode !== undefined) ? mode : '#000000')
        }]);
    }, [lines]);
    const handleMouseMove = useCallback((event) => {
        if (!isDrawing.current) return;
        const {offsetX, offsetY} = event.evt;
        setLines(lines.map((line, index) => {
            return (index === lines.length - 1
                    ? {
                        ...line,
                        points: line.points.concat([offsetX, offsetY]),
                        color: ((mode !== true && mode !== false && mode !== undefined) ? mode : '#000000')
                    }
                    : line
            )
        }))
    }, [lines]);
    const handleMouseUp = useCallback((event) => {
        isDrawing.current = false;
    }, [])
    const handleDbl = useCallback((event) => {
    }, [])

    useEffect(() => {
        if (mode) {
            eventsHandler({
                onDblClick: handleDbl,
                onMouseup: handleMouseUp,
                onMouseDown: handleMouseDown,
                onMousemove: handleMouseMove
            })
        }
    }, [mode, handleDbl, handleMouseUp, handleMouseDown, handleMouseMove]);

    return (
        <Layer>
            <Group>
                {lines.map((line, i) => (
                    <Line
                        key={i}
                        points={line.points}
                        stroke={(line.color !== true && line.color !== false && line.color !== undefined) ? line.color : "#000000"}
                        strokeWidth={5}
                        lineCap="round"
                        lineJoin="round"
                    />
                ))}
            </Group>
        </Layer>
    );
};

export default Brush;