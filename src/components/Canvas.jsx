import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Stage} from "react-konva";
import Graph from "./Tools/Graph";
import "../styles/Canvas.css"
import Brush from "./Tools/Brush";
import Elements from "./Tools/Elements";

const Canvas = ({instruments, htools, changeHtools}) => {
    const [width, setWidth] = useState(null);
    const [height, setHeight] = useState(null);

    // const [userId, setUserId] = useState(1);
    const [vertices, setVertices] = useState([]);
    const [edges, setEdges] = useState([]);
    const [texts, setTexts] = useState([]);
    const [elements, setElements] = useState([]);
    const [quarters, setQuarters] = useState([]);

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

    //get_map from server
    useEffect(() => {
        // const requestOptions = {
        //     method: 'GET',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify({userId: userId})
        // };

        fetch("http://localhost:8000/map")
            .then(response => response.json())
            .then(data => {
                setVertices(data.vertices)
                setEdges(data.edges)
                setTexts(data.texts)
                setElements(data.elements)
                setQuarters(data.quarters)
                // setUserId(1)
            });
    }, []);

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
                       vertexes={vertices}
                       vertexesHandler={setVertices}
                       edges={edges}
                       edgesHandler={setEdges}
                />
                <Elements mode={instruments.elements}
                          eventsHandler={setEvents}
                />
            </Stage>
        </div>
    );
};

export default Canvas;