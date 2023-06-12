import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Stage} from "react-konva";
import Graph from "./Tools/Graph";
import "../styles/Canvas.css"
import Brush from "./Tools/Brush";
import Elements from "./Tools/Elements";
import Landscape from "./Tools/Landscape";

const Canvas = ({instruments, htools, changeHtools, changeInstruments}) => {
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

    const stageRef = useRef(null);

    function downloadURI(uri, name) {
        let link = document.createElement('a');
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const handleExport = useCallback(() => {
        const uri = stageRef.current.toDataURL();
        console.log(uri);
        downloadURI(uri, 'stage.png');
    }, []);
    useEffect(() => {
        if (htools.savePng) {
            handleExport();
            changeHtools({
                ...htools,
                savePng: false,
            })
        }
    }, [changeHtools, htools, handleExport])
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (events.onKeyDown) {
                events.onKeyDown(e);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [events.onKeyDown]);

    return (
        <div className="canvas" ref={ref}>
            <Stage ref={stageRef}
                   width={width}
                   height={height}
                   onDblClick={events.onDblClick}
                   onMouseup={events.onMouseup}
                   onMouseDown={events.onMouseDown}
                   onMousemove={events.onMousemove}
            >
                <Brush mode={instruments.brush}
                       eventsHandler={setEvents}
                       width={width}
                       height={height}
                />
                <Graph mode={instruments.graph}
                       eventsHandler={setEvents}
                />
                <Landscape mode={instruments.landscape}
                           eventsHandler={setEvents}
                           changeInstruments={changeInstruments}></Landscape>
                <Elements mode={instruments.elements}
                          eventsHandler={setEvents}
                />
            </Stage>
        </div>
    );
};

export default Canvas;