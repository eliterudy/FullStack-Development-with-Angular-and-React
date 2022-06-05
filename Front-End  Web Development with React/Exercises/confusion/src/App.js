import React from "react";
import "./App.css";
import { Main as MainComponent } from "./components/index";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div>
        <MainComponent />
      </div>
    </BrowserRouter>
  );
}

export default App;
