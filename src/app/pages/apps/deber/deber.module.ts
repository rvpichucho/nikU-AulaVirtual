import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeberComponent } from './deber.component';
import { DeberAppRoutingModule} from './deber-app-routing.module';
import { UploadTaskModule } from './upload-task/upload-task.module';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { NgxDropzoneModule } from 'ngx-dropzone';
@NgModule({
  declarations: [DeberComponent],
  imports: [
    CommonModule,
    NgxDropzoneModule,
    UploadTaskModule,
    DeberAppRoutingModule,
    AngularFirestoreModule
  ],
})
export class DeberModule { }
