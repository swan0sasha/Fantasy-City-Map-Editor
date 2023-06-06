import React, { useEffect, useState } from "react";
import MousePanel from "./ToolPanels/MousePanel";
import LandscapePanel from "./ToolPanels/LandscapePanel";
import BrushPanel from "./ToolPanels/BrushPanel";
import ElementsPanel from "./ToolPanels/ElementsPanel";
import TextPanel from "./ToolPanels/TextPanel";
import ContourPanel from "./ToolPanels/ContourPanel";
import GraphPanel from "./ToolPanels/GraphPanel";
import "../styles/ToolPanels.css";

const ToolSettings = ({ tools, changeInstruments, instruments }) => {
    const [toolName, setToolName] = useState('mouse');

    useEffect(() => {
        setToolName(Object.keys(tools).find(key => tools[key] === true));
    }, [tools]);

    const [tool, setTool] = useState(null);

    useEffect(() => {
        switch (toolName) {
            case 'mouse':
                setTool(<MousePanel />);
                break;
            case 'landscape':
                setTool(<LandscapePanel />);
                break;
            case 'brush':
                setTool(<BrushPanel changeInstruments={changeInstruments} />);
                break;
            case 'elements':
                setTool(<ElementsPanel changeInstruments={changeInstruments} instruments={instruments} />);
                break;
            case 'text':
                setTool(<TextPanel />);
                break;
            case 'contour':
                setTool(<ContourPanel />);
                break;
            case 'graph':
                setTool(<GraphPanel changeInstruments={changeInstruments} instruments={instruments} />);
                break;
            default:
                setTool(null);
        }
    }, [toolName, changeInstruments, instruments]);

    return (
        <div className="toolPanel">
            {tool}
        </div>
    );
};

export default ToolSettings;