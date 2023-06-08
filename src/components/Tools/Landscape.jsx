import React, {useCallback, useEffect, useState} from 'react';
import {Group, Layer, Line} from "react-konva";
const Landscape = ({mode, eventsHandler, changeInstruments}) => {
    const [chosenEdges, setChosenEdges] = useState([]);
    const chooseEdges = useCallback((e) => {
        if (e.target.getClassName() === "Line") {
            setChosenEdges((prevEdges) => ([...prevEdges ,e.target.attrs.points]));
        }
    }, [chosenEdges]);

    const generateQuarter = useCallback(() => {
        //
        setChosenEdges([]);
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