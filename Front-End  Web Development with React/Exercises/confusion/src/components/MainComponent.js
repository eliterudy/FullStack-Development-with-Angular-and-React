import React, { useState } from "react";
import { Menu, DishDetail, Header, Footer } from "./index";
import { DISHES } from "../shared/dishes";

function MainComponent() {
  const [dishes, updateListOfDishes] = useState(DISHES);
  const [selectedDish, updateSelectedDish] = useState(null);
  const onDishSelect = (dishId) => {
    updateSelectedDish(dishId);
  };
  return (
    <div>
      <Header />
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
      <Footer />
    </div>
  );
}

export default MainComponent;
