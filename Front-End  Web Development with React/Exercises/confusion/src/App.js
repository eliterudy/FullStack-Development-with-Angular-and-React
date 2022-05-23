import logo from "./logo.svg";
import React, { useState } from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import Menu from "./components/MenuComponent";
import { DISHES } from "./shared/dishes";
import "./App.css";

function App() {
  const [dishes, updateListOfDishes] = useState(DISHES);
  return (
    <div>
      <Navbar dark color={"primary"}>
        <div className="container">
          <NavbarBrand href="/"> Ristorante Con Fusion</NavbarBrand>
        </div>
      </Navbar>
      <Menu dishes={dishes} />
    </div>
  );
}

export default App;
