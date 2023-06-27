import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  dishes: Dish[] = [];
  selectedDish: Dish | undefined;

  constructor(private dishService: DishService) {}

  ngOnInit() {
    this.dishes = this.dishService.getAllDishes();
  }

  onSelect(dish: Dish) {
    this.selectedDish = dish;
  }
}
