import React from 'react';
import "../styles/toolbar.css"
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import canvasState from "../store/canvasState";
import Mouse from "../tools/Mouse";
import Elements from "../tools/Elemets";
import Text from "../tools/Text";
const Toolbar = () => {
    return (
        <div className="toolbar">
            <div className="toolbar__btn">
                <button className="mouse" onClick={() => toolState.setTool(new Mouse(canvasState.canvas))}/>
                <button className="shovel"/>
                <button className="brush" onClick={() => toolState.setTool(new Brush(canvasState.canvas))}/>
                <button className="house" onClick={() => toolState.setTool(new Elements(canvasState.canvas))}/>
                <button className="text" onClick={() => toolState.setTool(new Text(canvasState.canvas))}/>
                <button className="contour"/>
                <button className="vertex"/>
            </div>
        </div>
    );
};

export default Toolbar;