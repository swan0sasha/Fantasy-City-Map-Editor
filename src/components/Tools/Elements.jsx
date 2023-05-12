import React, {useCallback, useEffect, useState} from 'react';
import {Group, Layer, Shape} from "react-konva";
import "../../styles/Canvas.css"
import coordinates from "../../resources/buildings.json";
import Segment from "../../ThisWillBeBackendOneDay/Segment";
import Quarter from "../../ThisWillBeBackendOneDay/Quarter";

const Elements = ({mode, eventsHandler}) => {
    const [elements, setElements] = useState(coordinates.elements);
    const [chosenEdges, setChosenEdges] = useState(
        []
    );

    const chooseEdges = useCallback((e) => {
        if (e.target.getClassName() === "Line") {
            console.log("where?")
            e.target.attrs.stroke = "red";
            setChosenEdges(chosenEdges.concat([e.target.attrs.points]));
        }
    }, [chosenEdges]);

    const generateQuarter = useCallback(() => {
        let edges = []

        for (let chosenEdge in chosenEdges){
            edges.push(new Segment(chosenEdge[0], chosenEdge[1], chosenEdge[2], chosenEdge[3]))
        }

        let quarter = new Quarter(edges)
        quarter.generateBuildings()
    },[chosenEdges]);

    const drawQuarter = (context, shape, element) => {
        context.beginPath();
        context.moveTo(element.vertexes[0].x * 50, element.vertexes[0].y * 50);
        for (let i = 1; i < element.vertexes.length; i++) {
            context.lineTo(element.vertexes[i].x * 50, element.vertexes[i].y * 50);
        }
        context.closePath();
        context.fillStrokeShape(shape);
    };

    useEffect(() => {
        if (mode === "choosing") {
            eventsHandler({
                onDblClick: chooseEdges,
                onMouseup: null,
                onMouseDown: chooseEdges,
                onMousemove: null
            })
        }
    }, [eventsHandler, mode, chooseEdges]);

    useEffect(() => {
        if (mode === "generating") {
            eventsHandler({
                onDblClick: null,
                onMouseup: null,
                onMouseDown: null,
                onMousemove: null
            });
            generateQuarter();
        }
    }, [eventsHandler, mode, generateQuarter]);

    return (
        <Layer>
            <Group>
                {(elements.map((element) => (
                    <Shape sceneFunc={(context, shape) => drawQuarter(context, shape, element)} fill="#F5DEB3"
                           stroke="black" strokeWidth={1}/>
                )))}
            </Group>
        </Layer>
    );
};

export default Elements;