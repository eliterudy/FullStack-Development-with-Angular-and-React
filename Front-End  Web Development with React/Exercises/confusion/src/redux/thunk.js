import { DISHES } from "../shared/dishes";
import { dishesLoading, dishesFailed, addDishes } from "./dishes";
const getDishesLoading = (val) => dishesLoading(val);
const getDishesFailed = (error) => dishesFailed(error);
const getAddDishes = (dishes) => addDishes(dishes);

export const fetchDishes = () => async (dispatch) => {
  dispatch(getDishesLoading(true));
  setTimeout(() => {
    dispatch(getAddDishes(DISHES));
  }, 2000);
};
