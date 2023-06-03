import React, {useEffect, useState} from "react";
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

    const [tool, setTool] = useState(mousePanel)
    useEffect(() => {
        switch (toolName) {
            case 'mouse' :
                setTool(mousePanel)
                break
            case 'landscape' :
                setTool(landscapePanel)
                break
            case 'brush' :
                setTool(brushPanel({changeInstruments}))
                break
            case 'elements' :
                setTool(elementsPanel({changeInstruments, instruments}))
                break
            case 'text' :
                setTool(textPanel)
                break
            case 'contour' :
                setTool(contourPanel)
                break
            case 'graph' :
                setTool(graphPanel({changeInstruments, instruments}))
                break
            default :
                setTool(mousePanel)
        }
    }, [toolName, changeInstruments, instruments]);

    return (
        <div className="toolPanel">
            {tool}
        </div>
    );
};

export default ToolSettings;