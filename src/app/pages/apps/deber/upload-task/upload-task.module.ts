import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadTaskComponent } from './upload-task.component'
@NgModule({
  declarations: [UploadTaskComponent],
  imports: [
    CommonModule
  ],
  entryComponents: [UploadTaskComponent],
  exports: [UploadTaskComponent]
})
export class UploadTaskModule { }
