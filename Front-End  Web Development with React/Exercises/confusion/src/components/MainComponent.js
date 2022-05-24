import React, { useState } from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import { Menu, DishDetail } from "./index";
import { DISHES } from "../shared/dishes";

function MainComponent() {
  const [dishes, updateListOfDishes] = useState(DISHES);
  const [selectedDish, updateSelectedDish] = useState(null);
  const onDishSelect = (dishId) => {
    updateSelectedDish(dishId);
  };
  console.log(":EE", dishes.filter((dish) => dish.id === selectedDish)[0]);
  return (
    <div>
      <Navbar dark color={"primary"}>
        <div className="container">
          <NavbarBrand href="/"> Ristorante Con Fusion</NavbarBrand>
        </div>
      </Navbar>
      <div className="container">
        <Menu
          dishes={dishes}
          onElementClicked={(dishId) => onDishSelect(dishId)}
        />
        {selectedDish !== null && (
          <DishDetail
            dish={dishes.filter((dish) => dish.id === selectedDish)[0]}
          />
        )}
      </div>
    </div>
  );
}

export default MainComponent;
