import React, {useCallback, useEffect, useState} from 'react';
import {Group, Layer, Line} from "react-konva";
const Landscape = ({mode, eventsHandler, changeInstruments, quarters, quartersHandler}) => {
    const address = "10.244.204.9"
    const [chosenEdges, setChosenEdges] = useState([]);

    const chooseEdges = useCallback((e) => {
        if (e.target.getClassName() === "Line") {
            setChosenEdges((prevEdges) => ([...prevEdges ,e.target.attrs.points]));
        }
    }, [chosenEdges]);

    const generateQuarter = useCallback(() => {
        let borders = []
        for (let i = 0; i < chosenEdges.length; i++) {
            let edge = chosenEdges[i]
            borders.push({
                start: [edge[0], edge[1]],
                end: [edge[2], edge[3]]
            })
        }
        let quarter = {
            color: "poor",
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
        console.log(mode)
        if (mode !== undefined && mode !== false) {
            eventsHandler({
                onDblClick: null,
                onMouseup: null,
                onMouseDown: chooseEdges,
                onMousemove: null
            })
        }
    }, [mode])

    useEffect(() => {

        if (mode === "generating") {
            generateQuarter();
            changeInstruments(prevState => ({
                ...prevState,
                landscape: true,
            }))
        }
    }, [mode, generateQuarter, chosenEdges]);
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