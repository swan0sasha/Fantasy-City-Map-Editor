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
      }
    }

    return (
        <div>
            <button onClick={() => changeMode('edge')}>Edge mode</button>
            <button onClick={() => changeMode('vertex')}>Vertex mode</button>
        </div>
    );
};

export default GraphPanel;