import React, {useState} from 'react';
import "../styles/HorizontalToolbar.css"

const HorizontalToolbar = ({change}) => {
    const changeInstrument = (instrument) => {
        change({
            savePng: false,
            saveFile: false,
            undo: false,
            redo: false,
            showGraph: false,
            [instrument]: true
        })
    }

    return (
        <div className="horizontal-toolbar">
            <div className="horizontal-toolbar__btn">
                <button className="savePng" onClick={()=>changeInstrument("savePng")}>save png</button>
                <button className="saveFile">save file</button>
                <button className="undo">undo</button>
                <button className="redo">redo</button>
                <button className="showGraph">show graph</button>
            </div>
        </div>
    );
};

export default HorizontalToolbar;