import React from 'react';
import ElementsColorPicker from "../ColorPicker/ElementsColorPicker";
import elements from "../Tools/Elements";

const ElementsPanel = ({changeInstruments, instruments}) => {

    // const changeMode = (mode) => {
    //     switch (mode) {
    //         case 'choosing' : {
    //             changeInstruments({
    //                 ...instruments = false,
    //                 elements: 'choosing'
    //             })
    //             break
    //         }
    //         case 'generating' : {
    //             changeInstruments({
    //                 ...instruments = false,
    //                 elements: 'generating'
    //             })
    //             break
    //         }
    //         default: {
    //             break
    //         }
    //     }
    // }
    const changeText = (event) => {
        let value = event.target.value;
        changeInstruments(prevState => {
            if (!prevState.elements.color){
                return {
                    ...prevState,
                    elements: {
                        color: "#000000",
                        number: value,
                    }
                }
            } else{
                return {
                    ...prevState,
                    elements: {
                        color: prevState.elements.color,
                        number: value,
                    }
                }
            }
        })
    }

    return (
        <div className="elementsPanel">
            <ElementsColorPicker changeColor={changeInstruments} instruments={instruments}></ElementsColorPicker>
            <input type="number" placeholder="number of vertices" onInput={changeText}></input>
            {/*<button onClick={() => changeMode('choosing')}>Choose edges</button>*/}
            {/*<button onClick={() => changeMode('generating')}>Generate</button>*/}
        </div>
    );
};

export default ElementsPanel;