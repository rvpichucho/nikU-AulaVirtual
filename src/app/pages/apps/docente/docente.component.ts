import { OnInit, Inject } from '@angular/core';
import { Component, AfterViewInit,Input, OnDestroy,TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';

import { Observable, of, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { DocenteCreateUpdateComponent } from './docente-create-update/docente-create-update.component';

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

import icClose from '@iconify/icons-ic/twotone-close';  
//
import { ActivatedRoute, Router } from "@angular/router";
//
import { Docente } from 'src/app/models/docente';
import { DocenteService} from 'src/app/services/docente.service';

@Component({
  selector: 'vex-docente',
  templateUrl: './docente.component.html',
  styleUrls: ['./docente.component.scss'],
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
export class DocenteComponent implements OnInit {
  layoutCtrl = new FormControl('boxed');
  docente :Docente[];
  @Input()
  columns: TableColumn<Docente>[] = [
    { label: 'Checkbox', property: 'checkbox', type: 'checkbox', visible: true },
    { label: 'Nombre',property: 'nombreDocente',type: 'text', visible: true, cssClasses: ['text-secondary'] }, 
    { label: 'Apellido',property: 'apellidoDocente',type: 'text', visible: true, cssClasses: ['text-secondary'] }, 
    { label: 'Telefono',property: 'telefonoDocente',type: 'text', visible: true, cssClasses: ['text-secondary'] }, 
    { label: 'Correo',property: 'correoDocente',type: 'text', visible: true, cssClasses: ['text-secondary'] }, 
    { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: MatTableDataSource<Docente> | null;
  selection = new SelectionModel<Docente>(true, []);
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
    protected docenteService :DocenteService) { 

    }
    get visibleColumns() {
      return this.columns.filter(column => column.visible).map(column => column.property);
    }
    openDialog(listDocente?: Docente[], docente?: Docente) {
      let message = 'Estas seguro de eliminar este registro?'
      if (docente) {
        listDocente = new Array<Docente>();
        listDocente.push(docente)
      }else if(listDocente.length>1)
        message =  'Estas seguro de eliminar '+listDocente.length+ ' registros?'
      
      this.dialog.open(DialogComponent, {
        data: message,
        disableClose: false,
        width: '400px'
      }).afterClosed().subscribe(result => {
        if (result === 'si')
          this.deleteDocente(listDocente)
      });
      
    }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.docenteService.getDocente().subscribe(
      (data) => { // Success
        this.docente = data;
        this.dataSource.data = data;
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
  createDocente() {
    this.dialog.open(DocenteCreateUpdateComponent).afterClosed().subscribe((docente: Docente) => {
      if (docente) {
        this.docenteService.createDocente(docente).then(
          (data)=>{
          this.showNotification('Docente creado EXITOSAMENTE', 'OK')
        },
        (err) => {
          this.showNotification('ERROR al crear docente', 'CERRAR')
        });
        }
    });
  }
  deleteDocente(docente: Docente[]){
    let tamaño = docente.length
    let promise = new Promise((resolve, reject) => {
      docente.forEach(estudio => {       
    
      this.docenteService.deleteDocente(estudio)
          .then(
            (data) => { // Success
              this.showNotification('Docente eliminado correctamente', 'CERRAR')
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
  updateDocente(docente :Docente){
    this.dialog.open(DocenteCreateUpdateComponent, {
      data: docente,
    }).afterClosed().subscribe(updateDocente => {
      if (updateDocente) {
        
        this.docenteService.updateDocente(updateDocente)
          .then(
            (data) => { // Success
              this.showNotification('Docente actualizado EXITOSAMENTE', 'OK')
            },
            (err) => {
              this.showNotification('ERROR al actualizar al Docente', 'CERRAR')
              
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
