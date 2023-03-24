import React from 'react';
import {Stage, Layer, Circle, Line} from 'react-konva';
import "../styles/Graph.css"
const Graph = ({edgeI}) => {
    const [edgesInstrument, setEdgesInstrument] = React.useState(false);
    const isDrawing = React.useRef(false);
    const [vertices, setVertices] = React.useState(
        []
    );
    const [edges, setEdges] = React.useState(
        []
    );
    React.useEffect(()=>
    {setEdgesInstrument(edgeI)}, [edgeI]);

    const addVertex = (e) =>{
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
                    start: (
                        (edge.start[0] >= vertex.x - 2) && (edge.start[0] <= vertex.x + 2) &&
                        (edge.start[1] >= vertex.y - 2) && (edge.start[1] <= vertex.y + 2)
                            ? [x, y]
                            : [edge.start[0], edge.start[1]]),
                    end: (
                        (edge.end[0] >= vertex.x - 2) && (edge.end[0] <= vertex.x + 2) &&
                        (edge.end[1] >= vertex.y - 2) && (edge.end[1] <= vertex.y + 2)
                            ? [x, y]
                            : [edge.end[0], edge.end[1]])
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
        }
    };
    const handleMouseDown = (e) => {
        if (!edgesInstrument) return
        isDrawing.current = true;
        const pos = e.target.getStage().getPointerPosition();
        if (e.target.getClassName() !== "Circle") {
            addVertex(e)
        }
        setEdges([...edges,
            {
            start: [pos.x, pos.y],
            end: [pos.x, pos.y]}
        ])
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
        <div className="graphCanvas">
            <Stage width={1500} height={800} onDblClick={addVertex}
                   onMouseDown={handleMouseDown}
                   onMousemove={handleMouseMove}
                   onMouseup={handleMouseUp}>
                <Layer>
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
                </Layer>
            </Stage>

        </div>
    );
};

export default Graph;