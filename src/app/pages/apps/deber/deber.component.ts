import { Component, OnInit,ViewEncapsulation,Inject } from '@angular/core';
import {  AfterViewInit,Input, OnDestroy,TemplateRef, ViewChild } from '@angular/core';
import { UploadTaskComponent} from "./upload-task/upload-task.component";
import { fadeInUp400ms } from '../../../../@vex/animations/fade-in-up.animation';
import { FormControl } from '@angular/forms';
//
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TableColumn } from '../../../../@vex/interfaces/table-column.interface';
import { aioTableData, aioTableLabels } from '../../../../static-data/aio-table-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icSearch from '@iconify/icons-ic/twotone-search';
import icAdd from '@iconify/icons-ic/twotone-add';
import icFilterList from '@iconify/icons-ic/twotone-filter-list';
import { SelectionModel } from '@angular/cdk/collections';
import icMoreHoriz from '@iconify/icons-ic/twotone-more-horiz';
import icFolder from '@iconify/icons-ic/twotone-folder';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { stagger40ms } from '../../../../@vex/animations/stagger.animation';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { MatSelectChange } from '@angular/material/select';
import theme from '../../../../@vex/utils/tailwindcss';
import icClose from '@iconify/icons-ic/twotone-close';  
//
import { ActivatedRoute, Router } from "@angular/router";
//
import { Deber } from 'src/app/models/deber';
import { DeberService} from 'src/app/services/deber.service';
//
import { Observable, of, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({

  selector: 'vex-deber',
  templateUrl: './deber.component.html',
  styleUrls: ['./deber.component.scss'],
  animations: [
    fadeInUp400ms,
    stagger40ms
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'standard'
      } as MatFormFieldDefaultOptions
    }
  ]
})
export class DeberComponent implements OnInit {
//
layoutCtrl = new FormControl('boxed');
  deber :Deber[];
  @Input()
  columns: TableColumn<Deber>[] = [
    { label: 'Checkbox', property: 'checkbox', type: 'checkbox', visible: true },
    { label: 'Título',property: 'nombreDeber',type: 'text', visible: true, cssClasses: ['text-secondary'] }, 
    { label: 'Calificación',property: 'calificacionDeber',type: 'text', visible: true, cssClasses: ['text-secondary'] }, 
    { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: MatTableDataSource<Deber> | null;
  selection = new SelectionModel<Deber>(true, []);
  searchCtrl = new FormControl();
  icEdit = icEdit;
  icSearch = icSearch;
  icDelete = icDelete;
  icAdd = icAdd;
  icFilterList = icFilterList;
  icMoreHoriz = icMoreHoriz;
  icFolder = icFolder;
  
  theme = theme;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private actRoute: ActivatedRoute,
    protected deberService : DeberService) { }
    get visibleColumns() {
      return this.columns.filter(column => column.visible).map(column => column.property);
    }
    openDialog(listDeber?: Deber[], deber?: Deber) {
      let message = 'Estas seguro de eliminar este registro?'
      if (deber) {
        listDeber = new Array<Deber>();
        listDeber.push(deber)
      }else if(listDeber.length>1)
        message =  'Estas seguro de eliminar '+listDeber.length+ ' registros?'
      
      this.dialog.open(DialogComponent, {
        data: message,
        disableClose: false,
        width: '400px'
      }).afterClosed().subscribe(result => {
        if (result === 'si')
          this.deleteDeber(listDeber)
      });
      
    }
  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.deberService.getDeber().subscribe(
      (data) => { // Success
        this.deber = data;
        this.dataSource.data = data;
        console.log(data);
        //console.log(this.estudiante);
      },
      (err) => {
        console.error(err)
      }
    );
    //this.actualizarMensajes();
    this.searchCtrl.valueChanges.pipe(
      untilDestroyed(this)
    ).subscribe(value => this.onFilterChange(value));
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
//

createDeber() {
  this.dialog.open(UploadTaskComponent).afterClosed().subscribe((deber: Deber) => {
    if (deber) {
      this.deberService.createDeber(deber)
      .then(
        (data)=>{
        this.showNotification('Deber creado EXITOSAMENTE', 'OK')
      },
      (err) => {
        console.log(err);
        this.showNotification('ERROR al crear deber', 'CERRAR')
      });
      }
  });
}
deleteDeber(deber: Deber[]){
  let tamaño = deber.length
  let promise = new Promise((resolve, reject) => {
    deber.forEach(deberes => {       
    /*this.deberService.deleteDeber(deberes)
        .then(
          (data) => { // Success
            this.showNotification('Deber eliminado correctamente', 'CERRAR')
          },
          (err) => {
            this.showNotification('A ocurrido un ERROR', 'CERRAR')
          }
        ); */
    })
    
    resolve()
  })
  promise.then(() => {
    this.selection.clear();
    if (tamaño > 1) {
      this.showNotification('Deber eliminado EXITOSAMENTE', 'OK')
    } else {
      this.showNotification('Deber eliminado EXITOSAMENTE', 'OK')
    }
  })

}
updateDeber(deber :Deber){
  console.log(deber); 
  this.dialog.open(UploadTaskComponent, {
    data: deber,
  }).afterClosed().subscribe(updateDeber => {
   /* if (updateDeber) {
      this.deberService.updateDeber(updateDeber)
        .then(
          (data) => { // Success
            this.showNotification('Docente actualizado EXITOSAMENTE', 'OK')
          },
          (err) => {
            this.showNotification('ERROR al actualizar al Docente', 'CERRAR')  
          }
        ); 
    }*/
  });

}

onFilterChange(value: string) {
  if (!this.dataSource) {
    return;
  }
  value = value.trim();
  value = value.toLowerCase();
  this.dataSource.filter = value;
}

toggleColumnVisibility(column, event) {
  event.stopPropagation();
  event.stopImmediatePropagation();
  column.visible = !column.visible;
}
isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.dataSource.data.length;
  return numSelected === numRows;
}
masterToggle() {
  this.isAllSelected() ?
    this.selection.clear() :
    this.dataSource.data.forEach(row => this.selection.select(row));
}

trackByProperty<T>(index: number, column: TableColumn<T>) {
  return column.property;
}

showNotification(message: string, action: string) {
  this.snackbar.open(message, action, {
    duration: 5000
  });
}
ngOnDestroy() {
}
//
 
}


@Component({
  selector: 'vex-components-dialog',
  template: `
      <div mat-dialog-title fxLayout="row" fxLayoutAlign="space-between center">
          <div>ALERTA</div>
          <button type="button" mat-icon-button (click)="close('null')" tabindex="-1">
              <mat-icon [icIcon]="icClose"></mat-icon>
            </button>
      </div>
      <mat-dialog-content>
          <p>{{message}}</p>
      </mat-dialog-content>
      <mat-dialog-actions align="end">
          <button mat-button (click)="close('no')">NO</button>
          <button mat-button color="primary" (click)="close('si')">SI</button>
      </mat-dialog-actions>
  `
})
export class DialogComponent {

  icClose = icClose;
  message: string;
 
  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any, 
              private dialogRef: MatDialogRef<DialogComponent>) {
  }

  close(answer: string) {
    this.dialogRef.close(answer);
  }
   
  ngOnInit() {
    this.message = this.defaults
  }  
}  
