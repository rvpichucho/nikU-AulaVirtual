import { Component, OnInit, Inject } from '@angular/core';
//
import { DatePipe, DeprecatedDatePipe} from "@angular/common";  
import { BrowserModule } from '@angular/platform-browser';
import { FormBuilder, FormGroup,Validators} from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Estudiante } from "src/app/models/estudiante";
import icMoreVert from "@iconify/icons-ic/twotone-more-vert";
import icClose from "@iconify/icons-ic/twotone-close";
import icDelete from "@iconify/icons-ic/twotone-delete";
import icPhone from "@iconify/icons-ic/twotone-phone";
import icPerson from "@iconify/icons-ic/twotone-person";
import { Router } from '@angular/router';
//
import icCedula from '@iconify/icons-fa-solid/address-card';
import icMail from '@iconify/icons-ic/twotone-mail';
import icCanton from '@iconify/icons-fa-solid/image';
import icNacimiento from '@iconify/icons-fa-solid/birthday-cake';
import icCheck from '@iconify/icons-ic/twotone-check';

@Component({
  selector: 'vex-estudiante-create-update',
  templateUrl: './estudiante-create-update.component.html',
  styleUrls: ['./estudiante-create-update.component.scss']
})
export class EstudianteCreateUpdateComponent implements OnInit {
  maxDate=new Date();
  date = new Date();
  form: FormGroup;
  mode: "create" | "update" = "create";
  //
  icMoreVert = icMoreVert;
  icClose = icClose;

 
  icDelete = icDelete;
//
  icPerson = icPerson;
  icCedula = icCedula;
  icCanton=icCanton;
  icMail = icMail;
  icNacimiento = icNacimiento;
  icCheck = icCheck;
  icPhone = icPhone;
//

  
  EstadoList = [
    {valor: true , mean: 'Activo'},
    {valor: false, mean: 'Inactivo'},
  ]
//
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<EstudianteCreateUpdateComponent>,
    private fb: FormBuilder,
    public datapipe: DatePipe
  ) { }

  ngOnInit() {
    if (this.defaults) {
      this.mode = "update";
    } else {
      this.date.setDate(this.date.getDate());
      this.defaults = {} as Estudiante;
    }
    
    this.form = this.fb.group({
      idEstudiante:this.defaults.id||"",
      nombreEstudiante:[this.defaults.nombreEstudiante||"",Validators.required],
      apellidoEstudiante:[this.defaults.apellidoEstudiante||"",Validators.required],
      cedulaEstudiante:[this.defaults.cedulaEstudiante||"",Validators.required],
      matriculaEstudiante:[this.defaults.matriculaEstudiante||"",Validators.required],
      regionEstudiante:[this.defaults.regionEstudiante||"",Validators.required],
      aprobadoExamen:[this.defaults.aprobadoExamen||"",Validators.required],
      fechaCurso:[this.defaults.fechaCurso||"",Validators.required],
      telefonoEstudiante:[this.defaults.telefonoEstudiante||"",Validators.required],
      correoEstudiante:[this.defaults.correoEstudiante||"",Validators.required],
      activoEstudiante:[this.defaults.activoEstudiante||"",Validators.required]
    }
    );
  }
  save() {
    if (this.mode === "create") {
      this.createEstudiante();
    } else if (this.mode === "update") {
      this.updateEstudiante();
    }
  }
  createEstudiante() {
    const estudiante = this.form.value;
    const date = this.form.get('fechaCurso').value;
    const fecha = this.datapipe.transform(date, 'yyyy-MM-dd');
    estudiante.fechaCurso = fecha;
    this.dialogRef.close(estudiante);
  }
  
  updateEstudiante() {
    const estudiante = this.form.value;
    this.dialogRef.close(estudiante);
  }
  isCreateMode() {
    return this.mode === "create";
  }

  isUpdateMode() {
    return this.mode === "update";
  }
}
