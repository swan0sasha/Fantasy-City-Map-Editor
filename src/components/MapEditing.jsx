import React, {useEffect, useState} from 'react';
import Canvas from "./Canvas";
import ToolSettings from "./ToolSetting";
import "../styles/MapEditing.css"

const MapEditing = ({tools, htools, changeHtools}) => {
    const [instruments, setInstruments] = useState({
        tools
    })
    useEffect(() => {
        setInstruments(tools)
    }, [tools])
    return (
        <div className="mapEditing">
            <Canvas instruments={instruments} htools = {htools} changeHtools = {changeHtools}/>
            <ToolSettings tools={tools} changeInstruments={setInstruments} instruments={instruments}></ToolSettings>
        </div>
    );
};

export default MapEditing;