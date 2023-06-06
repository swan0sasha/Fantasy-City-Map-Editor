import React, {useState} from 'react';
import {SketchPicker} from "react-color";
import elements from "../Tools/Elements";

const ElementsColorPicker = ({changeColor, instruments}) => {
    const [sketchPickerColor, setSketchPickerColor] = useState("#000000");
    const handleChangeColor = (color) => {
        setSketchPickerColor(color.hex);
        changeColor(prevState => {
            if (!prevState.elements.number){
                return {
                    ...prevState,
                    elements: {
                        color: color.hex,
                        number: 4,
                    }
                }
            } else{
                return {
                    ...prevState,
                    elements: {
                        color: color.hex,
                        number: prevState.elements.number,
                    }
                }
            }
        })
    }
    return (
        <SketchPicker color={sketchPickerColor} onChange={handleChangeColor}/>
    );
};

export default ElementsColorPicker;