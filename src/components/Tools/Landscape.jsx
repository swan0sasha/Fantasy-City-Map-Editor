import React, {useCallback, useEffect, useState} from 'react';
import {Group, Layer, Line} from "react-konva";

const Landscape = ({mode, eventsHandler, changeInstruments, edges, vertices}) => {
    const address = "10.244.204.9"
    const [chosenEdgesID, setChosenEdgesID] = useState([]);
    const [chosenEdgesCords, setChosenEdgesCords] = useState([]);

    // console.log(edges)
    const chooseEdges = useCallback((e) => {
        if (e.target.getClassName() === "Line") {
            let id = e.target.id()
            // console.log("line")
            // console.log(id)
            // console.log(edges)
            setChosenEdgesID((prevEdges) => ([...prevEdges, {start: edges[id].id1, end: edges[id].id2}]));
            setChosenEdgesCords((prevEdges) => ([...prevEdges, e.target.attrs.points]))
            // console.log("ids:")
            // console.log(JSON.stringify({start: edges[id].id1, end: edges[id].id2}))
        }
    }, [edges]);


    const generateQuarter = useCallback(() => {

        let pointSet = new Set()
        const points = chosenEdgesCords.reduce((acc, edge) => {
            acc.add(JSON.stringify({x: edge[0], y: edge[1]}));
            acc.add(JSON.stringify({x: edge[2], y: edge[3]}))
            // console.log(edge)
            return acc;
        }, pointSet);

        const pointArray = [...points]
        const formattedSet = pointArray.map((item) => {
            if (typeof item === 'string') return JSON.parse(item);
            else if (typeof item === 'object') return item;
        });
        // console.log(formattedSet)

        // Get the center (mean value) using reduce
        const center = formattedSet.reduce((acc, {x, y}) => {
            // console.log(x)
            // console.log(y)
            acc.x += x / formattedSet.length;
            acc.y += y / formattedSet.length;
            return acc;
        }, {x: 0, y: 0});
        // console.log("Center " + JSON.stringify(center))

        // Add an angle property to each point using tan(angle) = y/x
        const angles = formattedSet.map(({x, y}) => {
            return {x, y, angle: Math.atan2(y - center.y, x - center.x) * 180 / Math.PI};
        });

        // Sort your points by angle
        const pointsSorted = angles.sort((a, b) => a.angle - b.angle);
        let borders = []
        let start
        let end
        let startId
        let endId
        // console.log("Before")
        // console.log(chosenEdgesID)
        // console.log(pointsSorted)

        for (let i = 0; i < pointsSorted.length - 1; i++) {
            start = pointsSorted[i]
            end = pointsSorted[i + 1]
            vertices.map((vertex) => {
                if (vertex.x === start.x && vertex.y === start.y) {
                    startId = vertex.id
                }
                if (vertex.x === end.x && vertex.y === end.y) {
                    endId = vertex.id
                }
            })
            borders.push({
                start: startId,
                end: endId
            })
        }
        start = pointsSorted[pointsSorted.length - 1]
        end = pointsSorted[0]
        vertices.map((vertex) => {
            if (vertex.x === start.x && vertex.y === start.y) {
                startId = vertex.id
            }
            if (vertex.x === end.x && vertex.y === end.y) {
                endId = vertex.id
            }
        })
        borders.push({
            start: startId,
            end: endId
        })

        // console.log("After")
        // console.log(chosenEdgesID)
        // console.log(pointsSorted)

        let quarter = {
            color: "yellow",
            borders: borders
        }
        // console.log(JSON)
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                quarter: quarter
            })
        };

        fetch(`http://${address}:8000/quarters/generate`, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
            .then(() => setChosenEdgesCords([]));
    }, [chosenEdgesID, chosenEdgesCords, vertices]);


    useEffect(() => {
        // console.log(mode)
        if (mode !== undefined && mode !== false) {
            eventsHandler({
                onDblClick: null,
                onMouseup: null,
                onMouseDown: chooseEdges,
                onMousemove: null
            })
        }
    }, [mode, chooseEdges, eventsHandler])


    useEffect(() => {
        if (mode === "generating") {
            generateQuarter();
            changeInstruments(prevState => ({
                ...prevState,
                landscape: true,
            }))
        }
    }, [mode, generateQuarter, chosenEdgesID, changeInstruments]);
    return (
        <Layer>
            <Group>
                {mode && chosenEdgesCords.map((edge, i) => (
                    <Line
                        key={i.toString()}
                        points={edge}
                        stroke="red"
                        strokeWidth={2}
                        hitStrokeWidth={10}
                    />
                ))
                }
            </Group>
        </Layer>
    );
};

export default Landscape;