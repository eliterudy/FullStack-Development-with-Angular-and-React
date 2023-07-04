import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  dishes: Dish[] | undefined;
  selectedDish: Dish | undefined;

  constructor(private dishService: DishService) {}

  ngOnInit() {
    this.dishService.getAllDishes().then((dishes) => {
      this.dishes = dishes;
    });
  }

  onSelect(dish: Dish) {
    this.selectedDish = dish;
  }
}
