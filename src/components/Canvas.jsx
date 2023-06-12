import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Stage} from "react-konva";
import Graph from "./Tools/Graph";
import "../styles/Canvas.css"
import Brush from "./Tools/Brush";
import Elements from "./Tools/Elements";
import Landscape from "./Tools/Landscape";

const Canvas = ({instruments, htools, changeHtools, changeInstruments}) => {
    const address = "10.244.204.9"

    const [width, setWidth] = useState(null);
    const [height, setHeight] = useState(null);

    // const [userId, setUserId] = useState(1);
    const [vertices, setVertices] = useState([]);
    const [edges, setEdges] = useState([]);
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
            // console.log("Holly plz let me fix!")
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

        const interval = setInterval(() => {
            fetch(`http://10.244.204.9:8000/get_map`)
                .then(response => response.json())
                .then(data => {
                    //vertices
                    for (let i = 0; i < data.vertices.length; i++) {
                        data.vertices[i].isDragging = false;
                    }
                    for (let i = 0; i < vertices.length; i++) {
                        if (vertices[i].isDragging === true) {
                            let tempId = vertices[i].id
                            let tempVert = vertices[i]
                            for (let j = 0; j < data.vertices.length; j++) {
                                if (data.vertices[j].id === tempId) {
                                    data.vertices[j] = tempVert
                                    break
                                }
                            }
                        }
                    }
                    setVertices(data.vertices)

                    // data.vertices.map((vertex) => {
                    //     if (vertex.isDragging !== true){
                    //         setVertices([...vertices, vertex])
                    //     }
                    //     return vertex
                    // })

                    //edges
                    for (let i = 0; i < data.edges.length; i++) {
                        data.edges[i].isDragging = false;
                    }
                    for (let i = 0; i < edges.length; i++) {
                        if (edges[i].isDragging === true) {
                            let tempId = edges[i].id
                            let tempEdge = edges[i]
                            let bool = false
                            for (let j = 0; j < data.edges.length; j++) {
                                if (data.edges[j].id === tempId) {
                                    data.edges[j] = tempEdge
                                    bool = true
                                    break
                                }
                            }
                            if (!bool) {
                                data.edges.push(edges[i])
                            }
                        }
                    }
                    setEdges(data.edges)
                    // console.log(data.edges)

                    // setTexts(data.texts)
                    setElements(data.elements)
                    setQuarters(data.quarters)
                });
        }, 100);
        return () => clearInterval(interval);
    }, [vertices, edges]);

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
                       vertices={vertices}
                       verticesHandler={setVertices}
                       edges={edges}
                       edgesHandler={setEdges}
                />
                <Landscape mode={instruments.landscape}
                           eventsHandler={setEvents}
                           changeInstruments={changeInstruments}
                           quarters={quarters}
                           quartersHandler={setQuarters}
                />
                <Elements mode={instruments.elements}
                          eventsHandler={setEvents}
                          elements={elements}
                          elementsHandler={setElements}
                />
            </Stage>
        </div>
    );
};

export default Canvas;