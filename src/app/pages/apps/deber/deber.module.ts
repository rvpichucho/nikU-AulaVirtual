import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeberComponent,DialogComponent } from './deber.component';
import { DeberAppRoutingModule} from './deber-app-routing.module';
import { UploadTaskModule } from './upload-task/upload-task.module';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { NgxDropzoneModule } from 'ngx-dropzone';
//
import { PageLayoutModule } from '../../../../@vex/components/page-layout/page-layout.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BreadcrumbsModule } from '../../../../@vex/components/breadcrumbs/breadcrumbs.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { IconModule } from '@visurel/iconify-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ContainerModule } from '../../../../@vex/directives/container/container.module';
import { MatSelectModule } from '@angular/material/select';
import { ColorFadeModule } from '../../../../@vex/pipes/color/color-fade.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { DeberService } from 'src/app/services/deber.service';

@NgModule({
  declarations: [DeberComponent,DialogComponent],
  imports: [
    CommonModule,
    NgxDropzoneModule,
    UploadTaskModule,
    DeberAppRoutingModule,
    AngularFirestoreModule,
    FormsModule,
    MatSnackBarModule,
    PageLayoutModule,
    FlexLayoutModule,
    BreadcrumbsModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    IconModule,
    FormsModule,
    MatTooltipModule,
    ReactiveFormsModule,
    ContainerModule,
    MatSelectModule,
    ColorFadeModule,
    MatButtonToggleModule
  ],
  entryComponents: [DialogComponent],
  providers:[DeberService]
})
export class DeberModule { }
