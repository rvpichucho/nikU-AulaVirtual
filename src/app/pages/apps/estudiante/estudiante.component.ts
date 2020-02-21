import { OnInit, Inject } from '@angular/core';
import { Component, AfterViewInit,Input, OnDestroy,TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';

import { Observable, of, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { EstudianteCreateUpdateComponent } from './estudiante-create-update/estudiante-create-update.component';

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
import { fadeInUp400ms } from '../../../../@vex/animations/fade-in-up.animation';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { stagger40ms } from '../../../../@vex/animations/stagger.animation';
import { FormControl } from '@angular/forms';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { MatSelectChange } from '@angular/material/select';
import theme from '../../../../@vex/utils/tailwindcss';
//
import icClose from '@iconify/icons-ic/twotone-close';  
//
import { ActivatedRoute, Router } from "@angular/router";
//
import { Estudiante } from 'src/app/models/estudiante';
import { EstudianteService} from 'src/app/services/estudiante.service';

@Component({
  selector: 'vex-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.scss'],
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
export class EstudianteComponent implements OnInit,AfterViewInit,OnDestroy {
  layoutCtrl = new FormControl('boxed');
  estudiante :Estudiante[];
  @Input()
  columns: TableColumn<Estudiante>[] = [
    { label: 'Checkbox', property: 'checkbox', type: 'checkbox', visible: true },
    { label: 'Nombre',property: 'nombreEstudiante',type: 'text', visible: true, cssClasses: ['text-secondary'] }, 
    { label: 'Apellido',property: 'apellidoEstudiante',type: 'text', visible: true, cssClasses: ['text-secondary'] }, 
    { label: 'Cédula',property: 'cedulaEstudiante',type: 'text', visible: true, cssClasses: ['text-secondary'] }, 
    { label: 'Telefono',property: 'telefonoEstudiante',type: 'text', visible: true, cssClasses: ['text-secondary'] }, 
    { label: 'Correo',property: 'correoEstudiante',type: 'text', visible: true, cssClasses: ['text-secondary'] }, 
    { label: 'Región',property: 'regionEstudiante',type: 'text', visible: true, cssClasses: ['text-secondary'] }, 
    { label: 'Fecha de matrícula',property: 'fechaCurso', type: 'text', visible: true,cssClasses: ['text-secondary'] }, 
    { label: 'Estado matrícula',property: 'matriculaEstudiante',type: 'text', visible: true, cssClasses: ['text-secondary'] }, 
    { label: 'Activo',property: 'activoEstudiante',type: 'text', visible: true, cssClasses: ['text-secondary'] }, 
    { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ];
 
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: MatTableDataSource<Estudiante> | null;
  selection = new SelectionModel<Estudiante>(true, []);
  searchCtrl = new FormControl();
  icEdit = icEdit;
  icSearch = icSearch;
  icDelete = icDelete;
  icAdd = icAdd;
  icFilterList = icFilterList;
  icMoreHoriz = icMoreHoriz;
  icFolder = icFolder;
  //
  theme = theme;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  //return value ? "Activo" : "Inactivo";
  constructor( 
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private actRoute: ActivatedRoute,
    protected estudianteService :EstudianteService) {

   }
  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }
  openDialog(listEstudiante?: Estudiante[], estudiante?: Estudiante) {
    let message = 'Estas seguro de eliminar este registro?'
    if (estudiante) {
      listEstudiante = new Array<Estudiante>();
      listEstudiante.push(estudiante)
    }else if(listEstudiante.length>1)
      message =  'Estas seguro de eliminar '+listEstudiante.length+ ' registros?'
    
    this.dialog.open(DialogComponent, {
      data: message,
      disableClose: false,
      width: '400px'
    }).afterClosed().subscribe(result => {
      if (result === 'si')
        this.deleteEstudiante(listEstudiante)
    });
    
  }
  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.estudianteService.getEstudiante().subscribe(
      (data) => { // Success
        this.estudiante = data;
        
        //
        this.cambiarBoolean();
        this.dataSource.data = data;
      },
      (err) => {
        console.error(err)
      }
    );
    this.searchCtrl.valueChanges.pipe(
      untilDestroyed(this)
    ).subscribe(value => this.onFilterChange(value));
   
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  cambiarBoolean(){
    for (let e of this.estudiante){
      
    } 
  }
  


  createEstudiante() {
    this.dialog.open(EstudianteCreateUpdateComponent).afterClosed().subscribe((estudiante: Estudiante) => {
      if (estudiante) {
        this.estudianteService.createEstudiante(estudiante).then(
          (data)=>{
          this.showNotification('Estudiante creado EXITOSAMENTE', 'OK')
        },
        (err) => {
          this.showNotification('ERROR al crear estudiante', 'CERRAR')
        });
        }
    });
  }
  deleteEstudiante(estudiante: Estudiante[]){
    let tamaño = estudiante.length
    let promise = new Promise((resolve, reject) => {
      estudiante.forEach(estudio => {       
      this.estudianteService.deleteEstudiante(estudio)
          .then(
            (data) => { // Success
              this.showNotification('Estudiante eliminado correctamente', 'CERRAR')
            },
            (err) => {
              this.showNotification('A ocurrido un ERROR', 'CERRAR')
            }
          ); 
      })
      
      resolve()
    })
    promise.then(() => {
      this.selection.clear();
      if (tamaño > 1) {
        this.showNotification('Estudiante eliminado EXITOSAMENTE', 'OK')
      } else {
        this.showNotification('Estudiante eliminado EXITOSAMENTE', 'OK')
      }
    })

  }
  updateEstudiante(estudiante :Estudiante){
    this.dialog.open(EstudianteCreateUpdateComponent, {
      data: estudiante,
    }).afterClosed().subscribe(updateEstudiante => {
      if (updateEstudiante) {  
          
        this.estudianteService.updateEstudiante(updateEstudiante)
          .then(
            (data) => { // Success
              this.showNotification('Estudiante actualizado EXITOSAMENTE', 'OK')
            },
            (err) => {
              this.showNotification('ERROR al actualizar al estudiante', 'CERRAR')
            }
          );
          
      }
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