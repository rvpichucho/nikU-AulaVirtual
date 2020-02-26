import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DeberComponent } from './deber.component';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    component: DeberComponent
  },
  /*{
  path: 'docente-create-update',
  component: DocenteCreateUpdateComponent
  }*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeberAppRoutingModule { }
