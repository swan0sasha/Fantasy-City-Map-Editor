import React, {useEffect, useRef, useState} from 'react';
import Graph from "./Graph";
import Element from "./Element";
import "../styles/Canvas.css"
import Elements from "./Elements";

import {Stage} from "react-konva";
// import dataJson from '../recources/buildings.json';

const Canvas = ({instruments}) => {
    const [width, setWidth] = useState(null);
    const [height, setHeight] = useState(null);
    const ref = useRef(null);
    // let coordinates = null;
    useEffect(() => {
        function handleResize() {
            setWidth(ref.current.offsetWidth);
            setHeight(ref.current.offsetHeight);
        }

        window.addEventListener("resize", handleResize);
        handleResize(); // вызываем обработчик для первичной установки размеров

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // const readCoordinates = () =>{
    //      coordinates = JSON.parse(dataJson)
    // }
    // readCoordinates()

    return (
        <div className="canvas" ref={ref}>
            <Stage width={width} height={height}>
                {/*<Graph edgeI={instruments.graph} width={width} height={height}/>*/}
                {/*<Element/>*/}
                <Elements width={width} height={height}></Elements>
            </Stage>
        </div>
    );
};

export default Canvas;