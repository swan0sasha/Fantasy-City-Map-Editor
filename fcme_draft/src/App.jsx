import React from "react";
import "./styles/app.css"
import Toolbar from "./components/Toolbar";
import Canvas from "./components/Canvas";
import TopBar from "./components/TopBar";

function App() {
  return (
    <div className="app">
      <Toolbar/>
      <TopBar/>
      <Canvas/>
    </div>
  );
}

export default App;
