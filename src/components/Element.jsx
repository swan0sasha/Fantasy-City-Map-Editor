import React from 'react';
import {Stage, Layer, Shape, Group} from 'react-konva';
import coordinates from "../recources/buildings.json";


const Element = () => {

    const drawPolygon = (vertexes) => {
        return <Shape
            sceneFunc={function (context, shape) {
                context.beginPath();
                context.moveTo(vertexes.vertexes[0].x, vertexes.vertexes[0].y);
                for (let j = 1; j < vertexes.vertexes.length; j++) {
                    context.lineTo(vertexes[j].x, vertexes[j].y)
                }
                context.closePath();
                context.fillStrokeShape(shape);
            }}
            fill={'#00D2FF'}
            stroke={'black'}
            strokeWidth={4}
        >
        </Shape>
    };


    const drawAllPolygons = () => {
        return <Group>
            {() => {
                for (let i = 0; i < coordinates.elements.length; i++) {
                    let vertexes = []
                    vertexes = coordinates.elements[i];
                    drawPolygon(vertexes)
                }
            }}
        </Group>

    }
    drawAllPolygons();

    return (
        <Layer>
            <Group>
                {drawAllPolygons()}
            </Group>
        </Layer>
    );
};

export default Element;