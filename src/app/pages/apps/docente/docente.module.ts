import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocenteComponent,/*DialogComponent*/} from './docente.component';
import { DocenteAppRoutingModule} from './docente-app-routing.module';
import { DocenteService } from 'src/app/services/docente.service';
import { DocenteCreateUpdateComponent } from './docente-create-update/docente-create-update.component';
@NgModule({
  declarations: [DocenteComponent],
  imports: [
    CommonModule,
    DocenteAppRoutingModule,
    DocenteCreateUpdateComponent
    
  ],
  providers:[DocenteService]
})
export class DocenteModule { }
