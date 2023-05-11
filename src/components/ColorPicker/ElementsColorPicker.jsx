import React, {useState} from 'react';
import {SketchPicker} from "react-color";
const ElementsColorPicker = ({changeColor}) => {
    const [sketchPickerColor, setSketchPickerColor] = useState("#000000");
    const handleChangeColor = (color) =>{
        setSketchPickerColor(color.hex);
        // changeColor(color.hex)
    }
    return (
            <SketchPicker color={sketchPickerColor} onChange={handleChangeColor}/>
    );
};

export default ElementsColorPicker;