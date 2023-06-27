import React, { useEffect } from "react";
import { Menu, Header, Footer, Home, Contact, About } from "./index";
import {
  fetchDishes,
  fetchComments,
  fetchPromotions,
  fetchLeaders,
} from "../redux/thunk";
import { Switch, Route, Redirect } from "react-router-dom";
import DishDetail from "./DishDetailComponent";
import { useSelector, useDispatch } from "react-redux";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { withRouter } from "react-router-dom";
const MainComponent = withRouter((props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDishes());
    dispatch(fetchComments());
    dispatch(fetchPromotions());
    dispatch(fetchLeaders());
  }, [dispatch]);

  const state = useSelector((state) => {
    const { dishes, promotions, leaders, comments } = state;
    return {
      dishState: dishes,
      promotionState: promotions,
      leaderState: leaders,
      commentState: comments,
    };
  });
  const { dishState, promotionState, leaderState, commentState } = state;
  // const resetFeedbackForm = () => {
  //   dispatch(actions.reset("feedback"));
  // };

  const HomePage = () => {
    return (
      <Home
        dish={
          dishState.dishes &&
          dishState.dishes.filter((dish) => dish.featured)[0]
        }
        dishLoading={dishState.isLoading}
        dishErrMess={dishState.errMess}
        promotion={
          promotionState.promotions.filter((promotion) => promotion.featured)[0]
        }
        promotionLoading={promotionState.isLoading}
        promotionErrMess={promotionState.errMess}
        leader={leaderState.leaders.filter((leader) => leader.featured)[0]}
        leaderLoading={leaderState.isLoading}
        leaderErrMess={leaderState.errMess}
      />
    );
  };

  const DishWithId = ({ match, location, history }) => {
    const selectedDishId = parseInt(match.params.dishId, 10);
    return (
      <DishDetail
        dish={dishState.dishes.filter((dish) => dish.id === selectedDishId)[0]}
        dishLoading={dishState.isLoading}
        dishErrMess={dishState.errMess}
        comments={commentState.comments.filter(
          (comment) => comment.dishId === selectedDishId
        )}
        commentErrMess={dishState.errMess}
      />
    );
  };
  console.log("LOCARTION: ", props.location);
  return (
    <div>
      <Header />
      {/* Routes are defined and wrapped with a switch component */}
      <TransitionGroup>
        <CSSTransition key={props.location.key} classNames="page" timeout={300}>
          <Switch>
            <Route path="/home" component={HomePage} />
            <Route
              path="/aboutus"
              component={() => (
                <About
                  leaders={leaderState.leaders}
                  isLoading={leaderState.isLoading}
                  errMess={leaderState.errMess}
                />
              )}
            />
            <Route
              exact
              path="/menu"
              component={() => (
                <Menu
                  dishes={dishState.dishes}
                  isLoading={dishState.isLoading}
                  errMess={dishState.errMess}
                />
              )}
            />
            <Route path="/menu/:dishId" component={DishWithId} />
            <Route exact path="/contactus" component={Contact} />
            <Redirect to="/home" />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
      <Footer />
    </div>
  );
});

export default MainComponent;
