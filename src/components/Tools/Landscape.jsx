import React, {useCallback, useEffect, useState} from 'react';
import {Group, Layer, Line} from "react-konva";

const Landscape = ({mode, eventsHandler, changeInstruments, quarters, quartersHandler}) => {
    const address = "10.244.204.9"
    const [chosenEdges, setChosenEdges] = useState([]);

    const chooseEdges = useCallback((e) => {
        if (e.target.getClassName() === "Line") {
            setChosenEdges((prevEdges) => ([...prevEdges, e.target.attrs.points]));
        }
    }, []);


    const generateQuarter = useCallback(() => {

        let pointSet = new Set()
        const points = chosenEdges.reduce((acc, edge) => {
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
            console.log(x)
            console.log(y)
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

        // console.log("Before " + chosenEdges)
        for (let i = 0; i < pointsSorted.length - 1; i++) {
            let start = pointsSorted[i]
            let end = pointsSorted[i + 1]
            borders.push({
                start: [start.x, start.y],
                end: [end.x, end.y]
            })
        }
        let start = pointsSorted[pointsSorted.length - 1]
        let end = pointsSorted[0]
        borders.push({
            start: [start.x, start.y],
            end: [end.x, end.y]
        })
        // console.log("After " + borders)

        let quarter = {
            color: "yellow",
            borders: borders
        }
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
            .then(() => setChosenEdges([]));
    }, [chosenEdges]);


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
    }, [mode, generateQuarter, chosenEdges, changeInstruments]);
    return (
        <Layer>
            <Group>
                {mode && chosenEdges.map((edge, i) => (
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