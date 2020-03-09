import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoComponent } from './video.component';
//import { DocenteCreateUpdateComponent } from './docente-create-update/docente-create-update.component';


const routes: Routes = [
  {
    path: '',
    component: VideoComponent
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
export class VideoAppRoutingModule { }
