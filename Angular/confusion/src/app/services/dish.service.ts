import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DishService {
  constructor() {}

  getAllDishes = (): Promise<Dish[]> => {
    return of(DISHES).pipe(delay(2000)).toPromise() as Promise<Dish[]>;
  };

  getDish = (id: string): Promise<Dish> => {
    return of(DISHES.filter((dish) => dish.id === id)[0])
      .pipe(delay(2000))
      .toPromise() as Promise<Dish>;
  };

  getFeaturedDish = (): Promise<Dish> => {
    return of(DISHES.filter((dish) => dish.featured)[0])
      .pipe(delay(2000))
      .toPromise() as Promise<Dish>;
  };
}
