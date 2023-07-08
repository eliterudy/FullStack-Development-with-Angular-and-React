import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { baseURL } from '../shared/baseurl';

@Injectable({
  providedIn: 'root',
})
export class DishService {
  constructor(private http: HttpClient) {}

  getAllDishes = (): Observable<Dish[]> => {
    return this.http.get<Dish[]>(`${baseURL}/dishes`);
  };

  getDish = (id: string): Observable<Dish> => {
    return this.http.get<Dish>(`${baseURL}/dishes/${id}`);
  };

  getFeaturedDish = (): Observable<Dish> => {
    return this.http
      .get<Dish[]>(`${baseURL}/dishes/?featured=true`)
      .pipe(map((dishes) => dishes[0]));
  };

  getDishIds = (): Observable<string[] | any> => {
    return this.http
      .get<Dish[]>(`${baseURL}/dishes`)
      .pipe(map((dishes) => dishes.map((dish) => dish.id)));
  };
}
