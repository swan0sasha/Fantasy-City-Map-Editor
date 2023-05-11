import React, {useRef, useState, useEffect} from 'react';
import {Stage, Layer, Circle, Line, Group} from 'react-konva';
import "../styles/Canvas.css"

const Graph = ({edgeI, width, height, eventsHandler}) => {
    const [edgesInstrument, setEdgesInstrument] = useState();
    const isDrawing = useRef(false);
    const [vertices, setVertices] = React.useState(
        []
    );
    const [edges, setEdges] = React.useState(
        []
    );

    useEffect(() => {
        setEdgesInstrument(edgeI)
    }, [edgeI]);

    useEffect(() => {
        eventsHandler( {
            onDblClick: addVertex,
            onMouseDown: handleMouseDown,
            onMousemove: handleMouseMove,
            onMouseup: handleMouseUp,
        })
    }, [vertices, edges, edgesInstrument, isDrawing]);

    const addVertex = (e) => {
        const x = e.target.getStage().getPointerPosition().x;
        const y = e.target.getStage().getPointerPosition().y;
        setVertices([...vertices,
            {
                id: vertices.length.toString(),
                x: x,
                y: y,
                isDragging: false
            }])
    }
    const handleDragStart = (e) => {
        const id = e.target.id();
        setVertices(
            vertices.map((vertex) => {
                return {
                    ...vertex,
                    isDragging: vertex.id === id,
                };
            })
        );
    }
    const handleDragMove = (e) => {
        const id = e.target.id();
        const x = e.target.x();
        const y = e.target.y();
        setVertices(
            vertices.map((vertex) => {
                return {
                    ...vertex,
                    x: (vertex.id === id ? x : vertex.x),
                    y: (vertex.id === id ? y : vertex.y),
                };
            })
        );
        let vertex = vertices.find(vertex => vertex.id === id)
        setEdges(
            edges.map((edge) => {
                return {
                    ...edge,
                    ...edge,
                    start: (edge.start[0] === vertex.x && edge.start[1] === vertex.y ? [x, y] : [edge.start[0], edge.start[1]]),
                    end: (edge.end[0] === vertex.x && edge.end[1] === vertex.y ? [x, y] : [edge.end[0], edge.end[1]])
                };
            })
        );

    }
    const handleDragEnd = (e) => {
        const id = e.target.id();
        const x = e.target.x();
        const y = e.target.y();
        setVertices(
            vertices.map((vertex) => {
                return {
                    ...vertex,
                    x: (vertex.id === id ? x : vertex.x),
                    y: (vertex.id === id ? y : vertex.y),
                    isDragging: false,
                };
            })
        );
    }

    const handleMouseUp = (e) => {
        if (!edgesInstrument) return
        isDrawing.current = false;
        if (e.target.getClassName() !== "Circle") {
            addVertex(e)
        } else {
            setEdges(edges.map((edge, i) => {
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
    };
    const handleMouseDown = (e) => {
        if (!edgesInstrument) return
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
        setEdges([...edges,
            {
                start: [x, y],
                end: [x, y]
            }
        ])
        console.log("DOWN")
    };

    const handleMouseMove = (e) => {
        if (!edgesInstrument) return
        if (!isDrawing.current) {
            return;
        }
        const point = e.target.getStage().getPointerPosition();
        setEdges(edges.map((edge, i) => {
            return (i === edges.length - 1
                    ?
                    {
                        ...edge,
                        end: [point.x, point.y]
                    }
                    : edge
            )
        }));
    };

    return (
        <Layer>
            <Group>
                {edges.map((edge, i) => (
                    <Line
                        key={i}
                        points={[edge.start[0], edge.start[1], edge.end[0], edge.end[1]]}
                        stroke="black"
                        strokeWidth={2}
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
                        draggable={!edgesInstrument}
                        onDragMove={handleDragMove}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                        hitStrokeWidth={15}
                    />))
                }
            </Group>
        </Layer>
    );
};

export default Graph;