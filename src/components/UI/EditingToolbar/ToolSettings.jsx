import React from 'react';
import {useState} from "react";
import classes from "./ToolSettings.module.css";
import ToolSettingsButton from "./ToolSettingsElements/ToolSettingsButton";

const ToolSettings = ({tools}) => {
    const [vau, setVau] = useState('kavo')
    React.useEffect(()=> {setVau(Object.keys(tools).find(key => tools[key] === true))}, [tools]);

    return (
        <div className={classes.toolSettings}>
            <div>{vau}</div>
            <ToolSettingsButton>Add graph edge</ToolSettingsButton>
            <ToolSettingsButton>Add graph vertex</ToolSettingsButton>
        </div>
    );
};

export default ToolSettings;