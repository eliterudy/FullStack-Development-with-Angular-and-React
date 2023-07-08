import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root',
})
export class DishService {
  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) {}

  putDish(dish: Dish): Observable<Dish> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .put<Dish>(`${baseURL}/dishes/${dish.id}`, dish, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError)); // handling errors using error message handler service
  }

  getAllDishes = (): Observable<Dish[]> => {
    return this.http
      .get<Dish[]>(`${baseURL}/dishes`)
      .pipe(catchError(this.processHTTPMsgService.handleError)); // handling errors using error message handler service
  };

  getDish = (id: string): Observable<Dish> => {
    return this.http
      .get<Dish>(`${baseURL}/dishes/${id}`)
      .pipe(catchError(this.processHTTPMsgService.handleError)); // handling errors using error message handler service
  };

  getFeaturedDish = (): Observable<Dish> => {
    return this.http
      .get<Dish[]>(`${baseURL}/dishes/?featured=true`)
      .pipe(map((dishes) => dishes[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError)); // handling errors using error message handler service
  };

  getDishIds = (): Observable<string[] | any> => {
    return this.http
      .get<Dish[]>(`${baseURL}/dishes`)
      .pipe(map((dishes) => dishes.map((dish) => dish.id)))
      .pipe(catchError(this.processHTTPMsgService.handleError)); // handling errors using error message handler service
  };
}
