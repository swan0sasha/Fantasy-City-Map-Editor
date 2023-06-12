import React, {useCallback, useEffect, useState} from 'react';
import {Layer} from "react-konva";
import ElementShape from "./ElementShape";

const Elements = ({mode, eventsHandler}) => {
    // const [chosenEdges, setChosenEdges] = useState(
    //     []
    // );
    //
    // const chooseEdges = useCallback((e) => {
    //     if (e.target.getClassName() === "Line") {
    //         console.log("where?")
    //         e.target.attrs.stroke = "red";
    //         setChosenEdges(chosenEdges.concat([e.target.attrs.points]));
    //     }
    // }, [chosenEdges]);
    //
    // const generateQuarter = useCallback(() => {
    //     let edges = []
    //
    //     for (let chosenEdge in chosenEdges) {
    //         edges.push(new Segment(chosenEdge[0], chosenEdge[1], chosenEdge[2], chosenEdge[3]))
    //     }
    //
    //     let quarter = new Quarter(edges)
    //     quarter.generateBuildings()
    // }, [chosenEdges]);
    // useEffect(() => {
    //     if (mode === "choosing") {
    //         eventsHandler({
    //             onDblClick: chooseEdges,
    //             onMouseup: null,
    //             onMouseDown: chooseEdges,
    //             onMousemove: null
    //         })
    //     }
    // }, [eventsHandler, mode, chooseEdges]);
    //
    // useEffect(() => {
    //     if (mode === "generating") {
    //         eventsHandler({
    //             onDblClick: null,
    //             onMouseup: null,
    //             onMouseDown: null,
    //             onMousemove: null
    //         });
    //         generateQuarter();
    //     }
    // }, [eventsHandler, mode, generateQuarter]);
    const [elements, setElements] = useState([]);
    const [selectedId, selectShape] = React.useState(null);

    const checkDeselect = (e) => {
    };
    const handleDbl = useCallback((e) => {
        selectShape(null);
        const x = e.target.getStage().getPointerPosition().x;
        const y = e.target.getStage().getPointerPosition().y;
        let number = 4;
        let color = "#000000";
        if (mode !== true && mode !== undefined && mode !== null) {
            number = mode.number;
            color = mode.color;
        }
        setElements((prevElements) => {
            const radius = 15;
            let angle = 360 / number;
            let newElement = {
                vertexes: [],
                color: color,
                id: prevElements.length,
            };
            for (let i = 0; i < number; i++) {
                newElement.vertexes = [
                    ...newElement.vertexes,
                    {
                        x: x + radius * Math.cos((i * angle * Math.PI) / 180),
                        y: y + radius * Math.sin((i * angle * Math.PI) / 180)
                    }
                ];
            }
            return [...prevElements, newElement];
        });
    }, [mode]);
    const handleKeyDown = useCallback(
        (e) => {
            console.log(selectedId)
            if (e.code === 'Delete' && selectedId !== null) {
                setElements((prevElements) => {
                    const updatedElements = prevElements.filter((element) => element.id !== selectedId);
                    return updatedElements.map((element, index) => ({
                        ...element,
                        id: index,
                    }));
                });
                selectShape(null);
            }
        },
        [selectedId]
    );

    const handleMouseUp = useCallback((event) => {
    }, [])
    const handleMouseDown = useCallback((event) => {
        checkDeselect(event);
    }, []);
    const handleMouseMove = useCallback((event) => {
    }, [])
    useEffect(() => {
        if (mode) {
            eventsHandler({
                onDblClick: handleDbl,
                onMouseUp: handleMouseUp,
                onMouseDown: handleMouseDown,
                onMousemove: handleMouseMove,
                onKeyDown: handleKeyDown,
            })
        }
    }, [mode, handleMouseUp, handleMouseDown, handleMouseMove, handleDbl, handleKeyDown,eventsHandler])

    return (
        <Layer>
            {elements.map((element, i) => {
                return (
                    <ElementShape
                        key={element.id}
                        element={element}
                        isSelected={element.id === selectedId}
                        onSelect={() => {
                            selectShape(element.id);
                        }}
                        onChange={(newAttrs) => {
                            const elems = elements.slice();
                            elems[element.id] = newAttrs;
                            setElements(elems);
                        }}
                        enabled={!!mode}
                    />
                );
            })}
        </Layer>
    )
};

export default Elements;