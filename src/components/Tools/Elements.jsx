import React, {useCallback, useEffect, useState} from 'react';
import {Layer} from "react-konva";
import ElementShape from "./ElementShape";

const Elements = ({mode, eventsHandler, elements, elementsHandler}) => {
    const address = "10.244.204.9"
    let newIdCounter = 0
    // const [elements, setElements] = useState([]);
    const [selectedId, selectShape] = React.useState(null);

    const checkDeselect = (e) => {
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            selectShape(null);
        }
    };
    const handleDbl = useCallback((e) => {
        const x = e.target.getStage().getPointerPosition().x;
        const y = e.target.getStage().getPointerPosition().y;
        let number = 4;
        let color = "#F8E71C";
        if (mode !== true && mode !== undefined && mode !== null) {
            number = mode.number;
            color = mode.color;
        }
        // elementsHandler((prevElements) => {
        const radius = 15;
        let angle = 360 / number;
        let newElement = {
            vertices: [],
            color: color
        };
        for (let i = 0; i < number; i++) {
            newElement.vertices = [
                ...newElement.vertices,
                {
                    x: x + radius * Math.cos((i * angle * Math.PI) / 180),
                    y: y + radius * Math.sin((i * angle * Math.PI) / 180)
                }
            ];
        }
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newElement)
        };
        fetch(`http://${address}:8000/objects/add`, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
            });
        // return [...prevElements, newElement];
        // });
    }, [mode]);

    const idHandler = (id) => {
        if (id === null){
            let newId = newIdCounter
            newIdCounter++
            return newId
        }
        return id
    }

    const handleMouseUp = useCallback((event) => {
    }, [])
    const handleMouseDown = useCallback((event) => {
        checkDeselect(event)
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
            })
        }
    }, [mode, handleMouseUp, handleMouseDown, handleMouseMove, handleDbl, eventsHandler])

    return (
        <Layer>
            {elements.map((element) => {
                // console.log(elements);
                // console.log(element)
                return (
                    <ElementShape
                        key={element.id}
                        element={element}
                        isSelected={element.id === selectedId}
                        onSelect={() => {
                            // const requestOptions = {
                            //     method: 'PUT',
                            //     headers: {'Content-Type': 'application/json'},
                            //     body: JSON.stringify({id: element.id})
                            // };
                            // fetch(`http://${address}:8000/objects/select`, requestOptions)
                            //     .then(response => response.json())
                            //     .then(data => {
                            //         console.log(data)
                            //     })
                            //     .then(() => );
                            selectShape(element.id)
                        }}
                        onChange={(newAttrs) => {
                            const elems = elements.slice();
                            elems[element.id] = newAttrs;
                            // elementsHandler(elems)
                        }}
                        enabled={!!mode}
                    />
                );
            })}
        </Layer>
    )
};

export default Elements;