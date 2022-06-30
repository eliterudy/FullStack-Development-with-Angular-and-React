import React, { useState } from "react";
import { Menu, Header, Footer, Home, Contact, About } from "./index";
import { DISHES } from "../shared/dishes";
import { PROMOTIONS } from "../shared/promotions";
import { LEADERS } from "../shared/leaders";
import { COMMENTS } from "../shared/comments";

import { Switch, Route, Redirect } from "react-router-dom";
import DishDetail from "./DishDetailComponent";

const MainComponent = () => {
  const [dishes, updateListOfDishes] = useState(DISHES);
  const [promotions, updateListOfPromotions] = useState(PROMOTIONS);
  const [leaders, updateListOfLeaders] = useState(LEADERS);
  const [comments, updateListOfComments] = useState(COMMENTS);

  const HomePage = () => {
    return (
      <Home
        dish={dishes.filter((dish) => dish.featured)[0]}
        promotion={promotions.filter((promotion) => promotion.featured)[0]}
        leader={leaders.filter((leader) => leader.featured)[0]}
      />
    );
  };

  const DishWithId = ({ match, location, history }) => {
    const selectedDishId = parseInt(match.params.dishId, 10);
    return (
      <DishDetail
        dish={dishes.filter((dish) => dish.id === selectedDishId)[0]}
        comments={comments.filter(
          (comment) => comment.dishId === selectedDishId
        )}
      />
    );
  };

  return (
    <div>
      <Header />
      {/* Routes are defined and wrapped with a switch component */}
      <Switch>
        <Route path="/home" component={HomePage} />
        <Route path="/aboutus" component={() => <About leaders={leaders} />} />
        <Route exact path="/menu" component={() => <Menu dishes={dishes} />} />
        <Route path="/menu/:dishId" component={DishWithId} />
        <Route exact path="/contactus" component={Contact} />
        <Redirect to="/home" />
      </Switch>
      <Footer />
    </div>
  );
};

export default MainComponent;
