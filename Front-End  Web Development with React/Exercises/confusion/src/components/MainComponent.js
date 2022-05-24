import React, { useState } from "react";
import { Menu, Header, Footer, Home, Contact } from "./index";
import { DISHES } from "../shared/dishes";
import { PROMOTIONS } from "../shared/promotions";
import { LEADERS } from "../shared/leaders";

import { Switch, Route, Redirect } from "react-router-dom";

const MainComponent = () => {
  const [dishes, updateListOfDishes] = useState(DISHES);
  const [promotions, updateListOfPromotions] = useState(PROMOTIONS);
  const [leaders, updateListOfLeaders] = useState(LEADERS);

  const HomePage = () => {
    return (
      <Home
        dish={dishes.filter((dish) => dish.featured)[0]}
        promotion={promotions.filter((promotion) => promotion.featured)[0]}
        leader={leaders.filter((leader) => leader.featured)[0]}
      />
    );
  };

  return (
    <div>
      <Header />
      {/* Routes are defined and wrapped with a switch component */}
      <Switch>
        <Route path="/home" component={HomePage} />
        <Route exact path="/menu" component={() => <Menu dishes={dishes} />} />
        <Route exact path="/contactus" component={Contact} />

        <Redirect to="/home" />
      </Switch>
      <Footer />
    </div>
  );
};

export default MainComponent;
