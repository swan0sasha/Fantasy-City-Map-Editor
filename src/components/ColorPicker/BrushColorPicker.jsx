import React, {useState} from 'react';
import {SketchPicker} from "react-color";

const BrushColorPicker = ({change}) => {
    const [sketchPickerColor, setSketchPickerColor] = useState("#000000");
    const handleChangeColor = (color) => {
        setSketchPickerColor(color.hex);
        change(prev => ({
            ...prev,
            brush: color.hex,
        }))
    }
    return (
        <SketchPicker color={sketchPickerColor} onChange={handleChangeColor}/>
    );
};

export default BrushColorPicker;