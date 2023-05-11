import React, {useEffect, useRef, useState} from 'react';
import {Group, Layer, Shape, Stage} from "react-konva";
import "../styles/Canvas.css"
import coordinates from "../recources/buildings.json";

const Elements = ({width, height}) => {
    const [elements, setElements] = useState(coordinates.elements);
    const drawQuarter = (context, shape, quarter) => {
        context.beginPath();
        context.moveTo(quarter.vertexes[0].x * 15, quarter.vertexes[0].y * 15);
        for (let i = 1; i < quarter.vertexes.length; i++){
            context.lineTo(quarter.vertexes[i].x * 15, quarter.vertexes[i].y * 15);
        }
        context.closePath();
        context.fillStrokeShape(shape);
    };

    return (
        // <div >
                <Layer className="elementsCanvas">
                    <Group>
                        {(elements.map((element, i) => (
                            <Shape sceneFunc={(context, shape) => drawQuarter(context, shape, element)} fill="#F5DEB3" stroke="black" strokeWidth={1} />
                        )))}
                    </Group>
                </Layer>
        // </div>
    );
};

export default Elements;