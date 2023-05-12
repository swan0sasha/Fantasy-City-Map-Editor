import React, {useState} from 'react';
import Canvas from "./Canvas";
import ToolSettings from "./ToolSetting";
import "../styles/MapEditing.css"

const MapEditing = ({tools}) => {
    const [instruments, setInstruments] = useState({
        tools
    })
    return (
        <div className="mapEditing">
            <Canvas instruments={instruments}/>
            <ToolSettings tools={tools} changeInstruments={setInstruments} instruments={instruments}></ToolSettings>
        </div>
    );
};

export default MapEditing;