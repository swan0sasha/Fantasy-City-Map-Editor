import React, {useState} from "react";
import {Helmet, HelmetProvider} from "react-helmet-async";

import "./styles/App.css"
import Toolbar from "./components/Toolbar";
import ToolSettings from "./components/UI/ToolSettings/ToolSettings";
import Canvas from "./components/Canvas";

function App() {
    const [tools, setTools] = useState(
        {
            mouse: true,
            landscape: false,
            brush: false,
            elements: false,
            text: false,
            contour: false,
            graph: false,
        }
    );

    const [graphMode, setGraphMode] = useState(false);

    return (
        <HelmetProvider>
            <Helmet>
                <meta name="viewport"
                      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
                <title>Fantasy City Map Generator</title>
                <meta name="description" content="App Description"/>
                <meta name="theme-color" content="#008f68"/>
            </Helmet>
            <div className="App">
                <Toolbar change={setTools}/>
                <ToolSettings tools={tools} change={setGraphMode}/>
                <Canvas edgeInstr={graphMode}/>
            </div>
        </HelmetProvider>
    );
}

export default App;
