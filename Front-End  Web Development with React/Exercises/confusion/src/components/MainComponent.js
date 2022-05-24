import React, { useState } from "react";
import { Menu, Header, Footer, Home } from "./index";
import { DISHES } from "../shared/dishes";
import { Switch, Route, Redirect } from "react-router-dom";

const HomePage = () => {
  return <Home />;
};

const MainComponent = () => {
  const [dishes, updateListOfDishes] = useState(DISHES);
  // const [selectedDish, updateSelectedDish] = useState(null);
  // const onDishSelect = (dishId) => {
  //   updateSelectedDish(dishId);
  // };

  return (
    <div>
      <Header />
      {/* Routes are defined and wrapped with a switch component */}
      <Switch>
        <Route path="/home" component={HomePage} />
        <Route exact path="/menu" component={() => <Menu dishes={dishes} />} />
        <Redirect to="/home" />
      </Switch>
      <Footer />
    </div>
  );
};

export default MainComponent;
