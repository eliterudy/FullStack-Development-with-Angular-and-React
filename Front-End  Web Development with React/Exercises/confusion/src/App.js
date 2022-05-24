import React, { useState } from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import { DISHES } from "./shared/dishes";
import "./App.css";
import { Main as MainComponent } from "./components/index";

function App() {
  return (
    <div>
      <MainComponent />
    </div>
  );
}

export default App;
