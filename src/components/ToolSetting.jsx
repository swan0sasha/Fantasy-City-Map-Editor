import React, {useCallback, useEffect, useState} from "react";
import mousePanel from "./ToolPanels/MousePanel";
import landscapePanel from "./ToolPanels/LandscapePanel";
import brushPanel from "./ToolPanels/BrushPanel";
import elementsPanel from "./ToolPanels/ElementsPanel";
import textPanel from "./ToolPanels/TextPanel";
import contourPanel from "./ToolPanels/ContourPanel";
import graphPanel from "./ToolPanels/GraphPanel";
import "../styles/ToolPanels.css"

const ToolSettings = ({tools, changeInstruments, instruments}) => {
    const [toolName, setToolName] = useState('mouse')

    useEffect(() => {
        setToolName(Object.keys(tools).find(key => tools[key] === true))
    }, [tools]);

    const choosePanel = useCallback((toolName) => {
        switch (toolName) {
            case 'mouse' :
                return mousePanel
            case 'landscape' :
                return landscapePanel
            case 'brush' :
                return brushPanel
            case 'elements' :
                return elementsPanel({changeInstruments, instruments})
            case 'text' :
                return textPanel()
            case 'contour' :
                return contourPanel
            case 'graph' :
                return graphPanel({changeInstruments, instruments})
            default : {
                console.log("No such tool")
                break
            }
        }
    }, [changeInstruments, instruments])


    const [tool, setTool] = useState(mousePanel)
    useEffect(() => {
        setTool(choosePanel(toolName))
    }, [toolName, choosePanel]);

    return (
        <div className="toolPanel">
            {tool}
        </div>
    );
};

export default ToolSettings;