import React from 'react';
import ElementsColorPicker from "../ColorPicker/ElementsColorPicker";

const ElementsPanel = ({changeInstruments, instruments}) => {

    const changeMode = (mode) => {
        switch (mode) {
            case 'choosing' : {
                changeInstruments({
                    ...instruments = false,
                    elements: 'choosing'
                })
                break
            }
            case 'generating' : {
                changeInstruments({
                    ...instruments = false,
                    elements: 'generating'
                })
                break
            }
            default: {
                break
            }
        }
    }

    return (
        <div className="elementsPanel">
            <ElementsColorPicker></ElementsColorPicker>
            <button onClick={() => changeMode('choosing')}>Choose edges</button>
            <button onClick={() => changeMode('generating')}>Generate</button>
        </div>
    );
};

export default ElementsPanel;