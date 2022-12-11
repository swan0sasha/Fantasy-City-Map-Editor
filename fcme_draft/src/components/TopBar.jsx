import React from 'react';
import "../styles/topBar.css"
import canvasState from "../store/canvasState";
const TopBar = () => {
    return (
        <div className="topBar">
            <button className="topBar__btn file"/>
            <button className="topBar__btn undo" onClick={() => canvasState.undo()}/>
            <button className="topBar__btn redo" onClick={() => canvasState.redo()}/>
            <button className="topBar__btn graph"/>
        </div>
    );
};

export default TopBar;