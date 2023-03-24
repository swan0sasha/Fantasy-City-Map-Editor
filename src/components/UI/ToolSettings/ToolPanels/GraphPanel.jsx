import React from 'react';

import ToolSettingsButton from "../ToolSettingsElements/ToolSettingsButton";

const GraphPanel = ({change}) => {
    const changeMode = (mode) => {
      switch (mode){
          case 'vertex' : {
              change(false)
              console.log("Vertex mode is on")
              break
          }
          case 'edge' : {
              change(true)
              console.log("Edge mode is on")
              break
          }
          default: {
              console.log("No such mode")
              break
          }
      }
    }

    return (
        <div>
            <ToolSettingsButton onClick={() => changeMode('edge')}>Edge mode</ToolSettingsButton>
            <ToolSettingsButton onClick={() => changeMode('vertex')}>Vertex mode</ToolSettingsButton>
        </div>
    );
};

export default GraphPanel;