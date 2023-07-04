import { Component, OnInit, Input } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
})
export class DishdetailComponent implements OnInit {
  dish: Dish | undefined;
  dishIds: string[] | undefined;
  prev: string | undefined;
  next: string | undefined;

  constructor(
    private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  async ngOnInit() {
    // Older Approach: Using Snapshot | This needs page refresh
    // const id = this.route.snapshot.params['id'];
    // this.dishservice.getDish(id).subscribe((dish) => {
    //   this.dish = dish;
    // });

    // Newer Approach: Using Subscriber to Observable | This DOESN'T needs page refresh

    await this.dishservice
      .getDishIds()
      .subscribe((dishIds) => (this.dishIds = dishIds));
    this.route.params
      .pipe(
        switchMap((params: Params) => this.dishservice.getDish(params['id']))
      )
      .subscribe((dish) => {
        this.dish = dish;
        this.setPrevNext(dish.id);
      });
  }

  setPrevNext(dishId: string) {
    if (this.dishIds) {
      const index = this.dishIds.indexOf(dishId);
      this.prev =
        this.dishIds![
          (this.dishIds!.length + index - 1) % this.dishIds!.length
        ];
      this.next =
        this.dishIds[(this.dishIds.length + index + 1) % this.dishIds?.length];
    }
  }
  goBack(): void {
    this.location.back();
  }
}
