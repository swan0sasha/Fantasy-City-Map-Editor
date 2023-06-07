import React, {useRef, useState, useEffect, useCallback} from 'react';
import {Layer, Circle, Line, Group} from 'react-konva';
import "../../styles/Canvas.css"

const Graph = ({mode, eventsHandler, vertices, verticesHandler, edges, edgesHandler}) => {
    const userId = 1
    const [graphMode, setGraphMode] = useState();
    const isDrawing = useRef(false);
    // const [isEnabled, setIsEnabled] = useState(false);
    // const [vertices, setVertices] = useState(
    //     []
    // );
    // const [edges, setEdges] = useState(
    //     []
    // );

    useEffect(() => {
        setGraphMode(mode)
        // if (mode === undefined || mode === false){
        //     setIsEnabled(false)
        // }
        // else setIsEnabled(true)
    }, [mode]);

    const addVertex = useCallback((e) => {
        const x = e.target.getStage().getPointerPosition().x;
        const y = e.target.getStage().getPointerPosition().y;
        let vertex
        vertex = {
            x: x,
            y: y,
            isDragging: false
        }

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(vertex)
        };

        fetch("http://localhost:8000/vertexes/add", requestOptions)
            .then(response => response.json())
            .then(data => {
                delete data['response']
                verticesHandler([...vertices, vertex])
                console.log(data)
            });
    }, [vertices, verticesHandler]);

    const handleDragStart = (e) => {
        const id = e.target.id();
        verticesHandler(
            vertices.map((vertex) => {
                if (vertex.id === id) {
                    // vertex locked
                    vertex.isDragging = true
                    const requestOptions = {
                        method: 'PUT',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            userId: userId,
                            id: vertex.id
                        })
                    };
                    fetch("http://localhost:8000/vertexes/select", requestOptions)
                        .then(response => response.json())
                        .then(data => {
                            console.log(data)
                        });
                }
                return vertex;
            })
        );
    }
    const handleDragMove = (e) => {
        const id = e.target.id();
        const x = e.target.x();
        const y = e.target.y();
        verticesHandler(
            vertices.map((vertex) => {
                return {
                    ...vertex,
                    x: (vertex.id === id ? x : vertex.x),
                    y: (vertex.id === id ? y : vertex.y),
                };
            })
        );
        let vertex = vertices.find(vertex => vertex.id === id)
        edgesHandler(
            edges.map((edge) => {
                return {
                    ...edge,
                    ...edge,
                    start: (edge.start[0] === vertex.x && edge.start[1] === vertex.y ? [x, y] : [edge.start[0], edge.start[1]]),
                    end: (edge.end[0] === vertex.x && edge.end[1] === vertex.y ? [x, y] : [edge.end[0], edge.end[1]])
                };
            })
        );
        // vertex locked
    }
    const handleDragEnd = (e) => {
        const id = e.target.id();
        const x = e.target.x();
        const y = e.target.y();
        verticesHandler(
            vertices.map((vertex) => {
                if (vertex.id === id) {
                    // vertex unlocked
                    vertex.x = x
                    vertex.y = y
                    vertex.isDragging = false
                    const requestOptions = {
                        method: 'PUT',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(vertex.userId = userId)
                    };

                    fetch("http://localhost:8000/vertexes/move", requestOptions)
                        .then(response => response.json())
                        .then(data => {
                            console.log(data)
                        });
                }
                return vertex
            })
        );
    }

    const handleMouseUp = useCallback((e) => {
        if (graphMode === "edge") {
            isDrawing.current = false;
            if (e.target.getClassName() !== "Circle") {
                addVertex(e)
            } else {
                edgesHandler(edges.map((edge, i) => {
                    return (i === edges.length - 1
                            ?
                            {
                                ...edge,
                                end: [e.target.attrs.x, e.target.attrs.y]
                            }
                            : edge
                    )
                }));
            }
            console.log("UP")

        }
    }, [addVertex, edges, edgesHandler, graphMode]);

    const handleMouseDown = useCallback((e) => {
        if (graphMode === "edge") {
            isDrawing.current = true;
            let pos = e.target.getStage().getPointerPosition();
            let x = pos.x
            let y = pos.y
            if (e.target.getClassName() !== "Circle") {
                addVertex(e)
            } else {
                x = e.target.attrs.x
                y = e.target.attrs.y
            }
            edgesHandler([...edges,
                {
                    start: [x, y],
                    end: [x, y]
                }
            ])
            console.log("DOWN")

        }
    }, [addVertex, edges, graphMode, edgesHandler])


    const handleMouseMove = useCallback((e) => {
        if (graphMode === "edge") {
            if (!isDrawing.current) {
                return;
            }
            const point = e.target.getStage().getPointerPosition();
            console.log(point)
            edgesHandler(edges.map((edge, i) => {
                return (i === edges.length - 1
                        ?
                        {
                            ...edge,
                            end: [point.x, point.y]
                        }
                        : edge
                )
            }));
        }
    }, [edges, edgesHandler, graphMode])

    useEffect(() => {
        if (mode !== undefined && mode !== false) {
            eventsHandler({
                onDblClick: addVertex,
                onMouseup: handleMouseUp,
                onMouseDown: handleMouseDown,
                onMousemove: handleMouseMove
            })
        }
        // else {
        //     eventsHandler({
        //         onDblClick: null,
        //         onMouseup: null,
        //         onMouseDown: null,
        //         onMousemove: null
        //     })
        // }
    }, [addVertex, handleMouseUp, handleMouseDown, handleMouseMove, eventsHandler, mode]);

    return (
        <Layer>
            <Group>
                {edges.map((edge, i) => (
                    <Line
                        key={i}
                        points={[edge.start[0], edge.start[1], edge.end[0], edge.end[1]]}
                        stroke="black"
                        strokeWidth={2}
                        hitStrokeWidth={10}
                    />
                ))
                }
            </Group>
            <Group>
                {vertices.map((vertex) => (
                    <Circle
                        key={vertex.id}
                        id={vertex.id}
                        x={vertex.x}
                        y={vertex.y}
                        radius={3}
                        fill="black"
                        draggable={graphMode === "vertex"}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                        onDragMove={handleDragMove}
                        hitStrokeWidth={15}
                    />))
                }
            </Group>
        </Layer>
    );
};

export default Graph;