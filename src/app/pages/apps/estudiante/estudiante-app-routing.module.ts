import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstudianteComponent } from './estudiante.component';
import { EstudianteCreateUpdateComponent } from './estudiante-create-update/estudiante-create-update.component';

const routes: Routes = [
  {
    path: '',
    component: EstudianteComponent
  },
  {
  path: 'estudiante-create-update',
  component: EstudianteCreateUpdateComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstudianteAppRoutingModule { }
