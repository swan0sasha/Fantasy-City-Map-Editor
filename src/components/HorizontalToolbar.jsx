import React from 'react';
import "../styles/HorizontalToolbar.css"

const HorizontalToolbar = () => {
    return (
        <div className="horizontal-toolbar">
            <div className="horizontal-toolbar__btn">
                <button className="saveJpg">save jpg</button>
                <button className="saveFile">save file</button>
                <button className="undo">undo</button>
                <button className="redo">redo</button>
                <button className="showGraph">show graph</button>
            </div>
        </div>
    );
};

export default HorizontalToolbar;