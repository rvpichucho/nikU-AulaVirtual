import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocenteCreateUpdateComponent } from './docente-create-update.component';



@NgModule({
  declarations: [DocenteCreateUpdateComponent],
  imports: [
    CommonModule
  ],
  entryComponents: [DocenteCreateUpdateComponent],
  exports: [DocenteCreateUpdateComponent],
})
export class DocenteCreateUpdateModule { }
