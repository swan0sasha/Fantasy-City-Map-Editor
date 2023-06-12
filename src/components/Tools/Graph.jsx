import React, {useRef, useState, useEffect, useCallback} from 'react';
import {Layer, Circle, Line, Group} from 'react-konva';
import "../../styles/Canvas.css"

const Graph = ({mode, eventsHandler, vertices, verticesHandler, edges, edgesHandler}) => {
    const address = "10.244.204.9"
    const [graphMode, setGraphMode] = useState();
    const [currentEdge, setCurrentEdge] = useState(0);
    const [currentStartId, setCurrentStartId] = useState(0);
    // const [currentEndId, setCurrentEndId] = useState(0);
    let currentEndId = 0
    let newId = 0
    // const [newId, setNewId] = useState(0);

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

    const addVertex = useCallback(async(e) => {
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

        let id
        return await fetch(`http://${address}:8000/vertices/add`, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.response === true) {
                    let newVertex = {
                        id: data.id,
                        x: data.x,
                        y: data.y,
                        isDragging: false
                    }
                    //verticesHandler([...vertices, newVertex])
                    // console.log("before temp:")
                    // console.log(vertices)
                    let temp = vertices
                    temp[temp.length] = newVertex
                    // console.log("temp:")
                    // console.log(temp)
                }
                delete data['response']
                id = data.id
                return id
            });
    }, []);

    const handleVertexDragStart = (e) => {
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
                            id: vertex.id
                        })
                    };
                    fetch(`http://${address}:8000/vertices/select`, requestOptions)
                        .then(response => response.json())
                        .then(data => {
                            console.log(data)
                        });
                }
                return vertex;
            })
        );
    }
    const handleVertexDragMove = (e) => {
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
    const handleVertexDragEnd = (e) => {
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
                        body: JSON.stringify({
                            id: vertex.id,
                            x: x,
                            y: y
                        })
                    };

                    fetch(`http://${address}:8000/vertices/move`, requestOptions)
                        .then(response => response.json())
                        .then(data => {
                            console.log(data)
                        });
                }
                return vertex
            })
        );
    }

    const handleEdgeStart = useCallback(async (e) => {
        if (graphMode === "edge") {
            isDrawing.current = true;
            let pos = e.target.getStage().getPointerPosition();
            let x = pos.x
            let y = pos.y
            let startId
            if (e.target.getClassName() !== "Circle") {
                startId = await addVertex(e)
                // setCurrentStartId(newId)
                // console.log("new start: " + startId)
            } else {
                // setCurrentStartId(e.target.id())
                startId = e.target.id()
                // console.log("old start: " + startId)
                x = e.target.attrs.x
                y = e.target.attrs.y
            }
            setCurrentStartId(startId)

            let newEdge = {
                start: [x, y],
                startId: startId,
                endId: "",
                end: [x, y],
                isDragging: true
            }

            let temp = edges
            temp[temp.length] = newEdge
            edgesHandler(temp)
            setCurrentEdge(edges.length - 1)

        }
    }, [addVertex, edges, graphMode, edgesHandler, currentStartId, newId])


    const handleEdgeMove = useCallback((e) => {
        if (graphMode === "edge") {
            if (!isDrawing.current) {
                return;
            }
            const point = e.target.getStage().getPointerPosition();
            // console.log(point)
            edgesHandler(edges.map((edge, i) => {
                return (i === currentEdge
                        ?
                        {
                            ...edge,
                            end: [point.x, point.y]
                        }
                        : edge
                )
            }));
        }
    }, [edges, edgesHandler, graphMode, currentEdge])


    const handleEdgeEnd = useCallback(async (e) => {
        if (graphMode === "edge") {
            isDrawing.current = false;
            let endId
            let coords1
            let coords2

            for (let i = 0; i < vertices.length; i++) {
                if (vertices[i].id === currentStartId) {
                    coords1 = [vertices[i].x, vertices[i].y]
                }
            }
            if (e.target.getClassName() !== "Circle") {
                // endId = await addVertex(e)
                let pos = e.target.getStage().getPointerPosition()
                const requestOptions = {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        id1: currentStartId,
                        start: coords1,
                        end: [pos.x, pos.y]
                    })
                };

                fetch(`http://${address}:8000/edges/add2`, requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                    });
            } else {
                // setCurrentEndId(e.target.id())
                endId = e.target.id()
                // console.log("old end: " + endId)

                edgesHandler(edges.map((edge, i) => {
                    return (i === currentEdge
                            ?
                            {
                                ...edge,
                                end: [e.target.attrs.x, e.target.attrs.y],
                                endId: endId,
                                isDragging: false
                            }
                            : edge
                    )
                }));

                for (let i = 0; i < vertices.length; i++) {
                    if (vertices[i].id === endId) {
                        coords2 = [vertices[i].x, vertices[i].y]
                    }
                }

                const requestOptions = {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        id1: currentStartId,
                        id2: endId,
                        start: coords1,
                        end: coords2
                    })
                };

                fetch(`http://${address}:8000/edges/add`, requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                    });
            }
        }
    }, [addVertex, edges, edgesHandler, graphMode, currentEdge, currentStartId, currentEndId, newId]);

    useEffect(() => {
        if (mode !== undefined && mode !== false) {
            eventsHandler({
                onDblClick: addVertex,
                onMouseup: handleEdgeEnd,
                onMouseDown: handleEdgeStart,
                onMousemove: handleEdgeMove
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
    }, [addVertex, handleEdgeEnd, handleEdgeStart, handleEdgeMove, eventsHandler, mode]);

    return (
        <Layer>
            <Group>
                {edges.map((edge) => (
                    <Line
                        key={edge.id}
                        id={edge.id}
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
                        onDragStart={handleVertexDragStart}
                        onDragEnd={handleVertexDragEnd}
                        onDragMove={handleVertexDragMove}
                        hitStrokeWidth={15}
                    />))
                }
            </Group>
        </Layer>
    );
};

export default Graph;