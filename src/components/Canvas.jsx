import React, {useEffect, useRef, useState} from 'react';
import Graph from "./Graph";
import "../styles/Canvas.css"
import Elements from "./Elements";

import {Stage} from "react-konva";

const Canvas = ({instruments}) => {
    const [width, setWidth] = useState(null);
    const [height, setHeight] = useState(null);
    const [events, setEvents] = useState(
        {
            onDblClick: null,
            onMouseDown: null,
            onMousemove: null,
            onMouseup: null
        })
    const ref = useRef(null);
    // let coordinates = null;
    useEffect(() => {
        function handleResize() {
            setWidth(ref.current.offsetWidth);
            setHeight(ref.current.offsetHeight);
        }

        window.addEventListener("resize", handleResize);
        handleResize(); // вызываем обработчик для первичной установки размеров

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="canvas" ref={ref}>
            <Stage width={width}
                   height={height}
                   onDblClick={events.onDblClick}
                   onMouseDown={events.onMouseDown}
                   onMousemove={events.onMousemove}
                   onMouseup={events.onMouseup}
            >
                <Graph edgeI={instruments.graph} width={width} height={height} eventsHandler={setEvents}/>
                <Elements width={width} height={height}></Elements>
            </Stage>
        </div>
    );
};

export default Canvas;