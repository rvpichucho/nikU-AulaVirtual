import { OnInit } from '@angular/core';
import { Component, AfterViewInit,Input, OnDestroy,TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';

import { Observable, of, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
//import { MatDialog } from '@angular/material/dialog';
import { TableColumn } from '../../../../@vex/interfaces/table-column.interface';
import { aioTableData, aioTableLabels } from '../../../../static-data/aio-table-data';

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
import icPhone from '@iconify/icons-ic/twotone-phone';
import icMail from '@iconify/icons-ic/twotone-mail';
import icMap from '@iconify/icons-ic/twotone-map';

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
  estudiante: Estudiante;

  @Input()
  columns: TableColumn<Estudiante>[] = [
    { label: 'Checkbox', property: 'checkbox', type: 'checkbox', visible: true },
    { label: 'Nombre',property: 'nombreEstudiante',type: 'text', visible: true, cssClasses: ['text-secondary'] }, 
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
  
  theme = theme;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor( protected estudianteService :EstudianteService) {
    this.estudiante = new Estudiante(2);    
                this.estudiante.idEstudiante= 2;
                console.log(this.estudiante);
                this.createSignoVital();
   }
  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }
  
  createSignoVital() {
   
    this.estudianteService.createEstudiante(this.estudiante);
  }


  getData() {
    
  }
  ngOnInit() {
  }
  ngOnDestroy() {
  }
  ngAfterViewInit() {
    
  }
}
