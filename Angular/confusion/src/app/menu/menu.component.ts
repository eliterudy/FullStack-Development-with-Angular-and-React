import { Component, Inject, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  dishes?: Dish[];
  selectedDish?: Dish;
  errMess?: string;

  constructor(
    private dishService: DishService,
    @Inject('BaseURL') public baseURL: string
  ) {}

  ngOnInit() {
    this.dishService.getAllDishes().subscribe({
      next: (dishes) => {
        this.dishes = dishes;
      },
      error: (errMess) => (this.errMess = <any>errMess),
    });
  }
}
