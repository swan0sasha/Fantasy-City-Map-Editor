import React from 'react';
import {useState} from "react";
import classes from "./ToolSettings.module.css";
import mousePanel from "./ToolPanels/MousePanel";
import landscapePanel from "./ToolPanels/LandscapePanel";
import brushPanel from "./ToolPanels/BrushPanel";
import elementsPanel from "./ToolPanels/ElementsPanel";
import textPanel from "./ToolPanels/TextPanel";
import contourPanel from "./ToolPanels/ContourPanel";
import graphPanel from "./ToolPanels/GraphPanel";

const ToolSettings = ({tools, change}) => {
    const [toolName, setToolName] = useState('kavo')
    React.useEffect(()=> {setToolName(Object.keys(tools).find(key => tools[key] === true))}, [tools]);

    const [tool, setTool] = useState(mousePanel)
    React.useEffect(()=> {setTool(choosePanel(toolName))}, [toolName]);

    const choosePanel = (toolName) => {
      switch (toolName) {
          case 'mouse' : return mousePanel
          case 'landscape' : return landscapePanel
          case 'brush' : return brushPanel
          case 'elements' : return elementsPanel
          case 'text' : return textPanel
          case 'contour' : return contourPanel
          case 'graph' : return graphPanel({change})
      }
    }

    return (
        <div className={classes.toolSettings}>
            <div>{toolName}</div>
            {tool}
        </div>
    );
};

export default ToolSettings;