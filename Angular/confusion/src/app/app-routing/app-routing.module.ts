import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { routes } from './routes';

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)], // added RouterModule and provided routes from routes.ts file
  exports: [RouterModule], // need to export the Router Module to access from App.module.ts
  declarations: [],
})
export class AppRoutingModule {}
