import React, {useState} from 'react';
import {Group, Layer, Shape} from "react-konva";
import "../styles/Canvas.css"
import coordinates from "../resources/buildings.json";

const Elements = ({width, height}) => {
    const [elements, setElements] = useState(coordinates.elements);
    const drawQuarter = (context, shape, element) => {
        context.beginPath();
        context.moveTo(element.vertexes[0].x * 15, element.vertexes[0].y * 15);
        for (let i = 1; i < element.vertexes.length; i++) {
            context.lineTo(element.vertexes[i].x * 15, element.vertexes[i].y * 15);
        }
        context.closePath();
        context.fillStrokeShape(shape);
    };

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