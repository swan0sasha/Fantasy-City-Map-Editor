import React, {useState} from "react";
import {Helmet, HelmetProvider} from "react-helmet-async";

import "./styles/App.css"
import Toolbar from "./components/Toolbar";
import EditingToolbar from "./components/UI/EditingToolbar/EditingToolbar";
import Canvas from "./components/Canvas";
function App() {
    const [editingToolbar, setEditingToolbar] = useState(
        {
            mouse: false,
            landscape: false,
            brush: false,
            elements: false,
            text: false,
            contour: false,
            graph: false,
        }
    );
    const changeEditingToolbar = (instrument) => {
        setEditingToolbar({
            mouse: false,
            landscape: false,
            brush: false,
            elements: false,
            text: false,
            contour: false,
            graph: false,
            [instrument]: true })
        console.log(editingToolbar)
    }

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
              <Toolbar change={changeEditingToolbar}/>
              <EditingToolbar instruments = {editingToolbar}/>
              <Canvas/>
          </div>
      </HelmetProvider>
  );
}

export default App;
