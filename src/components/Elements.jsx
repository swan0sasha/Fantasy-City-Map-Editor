import React, {useEffect, useRef, useState} from 'react';
import {Layer, Shape, Stage} from "react-konva";
import "../styles/Canvas.css"

const Elements = ({width, height}) => {
    const [elements, setElements] = useState([
        {
            vertexes: [
                {x: 2.096293517229446, y: 1.9643851929620024},
                {x: 1.8963810000765466, y: 3.0477707219086896},
                {x: 1.0511942271394943, y: 3.7520930326895665},
                {x: 0.031670501243681315, y: 2.5286645616145913},
                {x: 1.3461216935628577, y: 1.2142133692954145}]
        },
        {
            vertexes: [
                {x: 2.7687243241262993, y: 1.7012387021748276},
                {x: 1.6444471460375745, y: 1.512538821770131},
                {x: 1.3260535321771136, y: 1.1941452079096704},
                {x: 2.512097720727064, y: 0.008101019359719408},
                {x: 3.317168131524718, y: 0.33012918367878086}]
        },
        {
            vertexes: [
                {x: 3.949169940149172, y: 1.5059566400276707},
                {x: 2.9988830512146807, y: 1.1258418844538745},
                {x: 3.3014850160012763, y: 0.3693369724873855},
                {x: 4.251771904935764, y: 0.7494517280611898}]
        },
        {
            vertexes: [
                {x: 3.6520224883268697, y: 2.248825269583427},
                {x: 4.266585296497604, y: 0.7124182491565897},
                {x: 4.982860321876698, y: 0.9989282593082272},
                {x: 4.691309441687243, y: 2.456682660255502}]
        },
        {
            vertexes: [
                {x: 2.7645169535538443, y: 3.9430004300209442},
                {x: 3.278311804895563, y: 2.174083132897166},
                {x: 4.681522000351148, y: 2.454725171988283},
                {x: 4.469521913342669, y: 3.514725607030675},
                {x: 3.4028820219531224, y: 4.581365498420222}]
        },
        {
            vertexes: [
                {x: 2.551864334981678, y: 3.7303478114487776},
                {x: 3.3877317985581628, y: 4.566215275025263},
                {x: 2.489818890401837, y: 5.464128183181589},
                {x: 1.662568479951209, y: 4.4714276906408355}]
        },
        {
            vertexes: [
                {x: 1.6471720214117225, y: 3.255444870796043},
                {x: 2.2515063830319018, y: 3.980646104740258},
                {x: 1.6545068877785116, y: 4.478145684118083},
                {x: 1.0501725261583459, y: 3.752944450173857}]
        }
    ]);
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
        <div className="elementsCanvas">
            <Stage width={width} height={height}>
                <Layer>
                    {(elements.map((element, i) => (
                        <Shape sceneFunc={(context, shape) => drawQuarter(context, shape, element)} fill="#F5DEB3" stroke="black" strokeWidth={1} />
                    )))}
                </Layer>
            </Stage>
        </div>
    );
};

export default Elements;