import React from 'react';
import {Stage, Layer, Circle, Line} from 'react-konva';
import "./Graph.css"
const Graph = () => {
    const [edgesInstrument, setEdgesInstrument] = React.useState(false);
    const [size, setSize] = React.useState([]);
    const isDrawing = React.useRef(false);
    const [vertices, setVertices] = React.useState(
        []
    );
    const [edges, setEdges] = React.useState(
        []
    );
    const changeInstrument = () => {
        setEdgesInstrument(!edgesInstrument);
    }
    const addVertex = (e) =>{
        const x = e.target.getStage().getPointerPosition().x;
        const y = e.target.getStage().getPointerPosition().y;
        const vertex = {
            id: vertices.length,
            x: x,
            y: y,
            isDragging: false
        }
        setVertices([...vertices, vertex])
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
        if (e.target.getClassName() != "Circle") {
            addVertex(e)
        }
    };
    const handleMouseDown = (e) => {
        if (!edgesInstrument) return
        isDrawing.current = true;
        const pos = e.target.getStage().getPointerPosition();
        if (e.target.getClassName() != "Circle") {
            addVertex(e)
        }
        edges[edges.length] = {
            start: [pos.x, pos.y],
            end: [pos.x, pos.y]
        }
        setEdges(edges)
        console.log(edges)
    };

    const handleMouseMove = (e) => {
        if (!edgesInstrument) return
        if (!isDrawing.current) {
            return;
        }
        const point = e.target.getStage().getPointerPosition();
        let lastEdge = edges[edges.length - 1]
        lastEdge.end = [point.x, point.y]
        setEdges(edges.concat());
        console.log(edges)
        console.log(vertices)
    };
    const windowSize = React.useRef([window.innerWidth, window.innerHeight]);
    let width = windowSize[0]
    let height = windowSize[1]

    return (
        <div className="graphCanvas">
            <Stage width={1075} height={528} onDblClick={addVertex}
                   onMouseDown={handleMouseDown}
                   onMousemove={handleMouseMove}
                   // onMousemove={getWidth}
                   onMouseup={handleMouseUp}>
                <Layer>
                    {vertices.map((vertex) => (
                        <Circle
                            key={vertex.id}
                            id={vertex.id}
                            x={vertex.x}
                            y={vertex.y}
                            radius={3}
                            fill="black"
                            draggable = {!edgesInstrument}
                            onDragMove={handleDragMove}
                            onDragStart={handleDragStart}
                            onDragEnd={handleDragEnd}
                        />))
                    }
                    {edges.map((edge, i) =>(
                        <Line
                            key={i}
                            points={[edge.start[0], edge.start[1], edge.end[0], edge.end[1]]}
                            stroke="black"
                            strokeWidth={2}
                        />
                    ))
                    }
                </Layer>
            </Stage>

        </div>
    );
};

export default Graph;