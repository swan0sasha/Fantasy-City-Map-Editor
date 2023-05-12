import React, {useEffect, useRef, useState} from 'react';
import Graph from "./Tools/Graph";
import "../styles/Canvas.css"
import Elements from "./Tools/Elements";

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
            console.log("Holly plz let me fix!")
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
                   onMouseup={events.onMouseup}
                   onMouseDown={events.onMouseDown}
                   onMousemove={events.onMousemove}
            >
                <Graph mode={instruments.graph}
                       eventsHandler={setEvents}
                />
                <Elements mode={instruments.elements}
                          eventsHandler={setEvents}
                />
            </Stage>
        </div>
    );
};

export default Canvas;