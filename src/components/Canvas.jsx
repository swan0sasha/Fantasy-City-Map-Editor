import React from 'react';
import Graph from "./Graph";
import "../styles/Canvas.css"

const Canvas = ({edgeInstr}) => {
    return (
        <div className="canvas">
            <Graph edgeI = {edgeInstr}/>
        </div>
    );
};

export default Canvas;