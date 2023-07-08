import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import messages from '../shared/messages';
import { Comment } from '../shared/comment';
const { formErrorMessages } = messages || {};

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
})
export class DishdetailComponent implements OnInit {
  // Update form in template for comment form
  @ViewChild('fform')
  commentFormDirective: any;

  dish?: Dish;
  dishIds?: string[];
  prev?: string;
  next?: string;
  errMess?: string;

  // Comment Form Group
  commentForm!: FormGroup;
  comment!: Comment;

  // Comment Form Error messages
  commentFormError: any = {
    author: '',
    comment: '',
  };

  constructor(
    private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  async ngOnInit() {
    // Older Approach: Using Snapshot | This needs page refresh
    // const id = this.route.snapshot.params['id'];
    // this.dishservice.getDish(id).subscribe((dish) => {
    //   this.dish = dish;
    // });

    // Newer Approach: Using Subscriber to Observable | This DOESN'T needs page refresh

    this.dishservice.getDishIds().subscribe({
      next: (dishIds) => (this.dishIds = dishIds),
      error: (errMess) => (this.errMess = errMess),
    });

    this.route.params
      .pipe(
        switchMap((params: Params) => this.dishservice.getDish(params['id']))
      )
      .subscribe({
        next: (dish) => {
          this.dish = dish;
          this.setPrevNext(dish.id);
        },
        error: (errMess) => (this.errMess = errMess),
      });
  }

  // create a new form for accepting user comments
  createForm = () => {
    this.commentForm = this.fb.group({
      author: [
        '',
        [
          Validators.required, // validation to check required
          Validators.minLength(2), // validation to check min length
        ],
      ],
      rating: 4,
      comment: [
        '',
        [
          Validators.required, // validation to check required
          Validators.minLength(1), // validation to check min length
          Validators.maxLength(100),
        ], // validation to check max length
      ],
    });

    this.commentForm.valueChanges.subscribe((data) =>
      this.onValueChanged(data)
    );

    this.onValueChanged(); // (re)set validation messages now
  };

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

  onValueChanged(data?: any) {
    console.log(this.commentForm.status == 'VALID');
    if (!this.commentForm) {
      return;
    }
    const form = this.commentForm;
    for (const field in this.commentFormError) {
      if (this.commentFormError.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.commentFormError[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = formErrorMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.commentFormError[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  // on submit for new comment form
  onSubmit = () => {
    this.dish?.comments.push({
      ...this.commentForm.value,
      date: new Date().toISOString(),
    });
    console.log(this.comment);
    this.commentForm.reset({
      author: '',
      rating: 1,
      comment: '',
    });
    this.commentFormDirective.resetForm();
  };
}
