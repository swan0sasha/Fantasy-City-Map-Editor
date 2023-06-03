import React from 'react';
import BrushColorPicker from "../ColorPicker/BrushColorPicker";

const BrushPanel = ({changeInstruments}) => {
    return (
        <div>
            <BrushColorPicker change={changeInstruments}></BrushColorPicker>
        </div>
    );
};

export default BrushPanel;