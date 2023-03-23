import React from 'react';
import classes from './ToolSettingsButton.module.css'
const ToolSettingsButton = ({children, ...props}) => {
    return (
        <button className={classes.tsButton}>
            {children}
        </button>
    );
};

export default ToolSettingsButton;