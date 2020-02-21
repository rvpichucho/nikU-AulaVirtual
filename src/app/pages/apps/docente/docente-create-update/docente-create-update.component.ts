import { Component, OnInit, Inject } from '@angular/core';
import { DatePipe, DeprecatedDatePipe} from "@angular/common";  
import { BrowserModule } from '@angular/platform-browser';
import { FormBuilder, FormGroup,Validators} from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import icMoreVert from "@iconify/icons-ic/twotone-more-vert";
import icClose from "@iconify/icons-ic/twotone-close";
import icDelete from "@iconify/icons-ic/twotone-delete";
import icPhone from "@iconify/icons-ic/twotone-phone";
import icPerson from "@iconify/icons-ic/twotone-person";
import { Router } from '@angular/router';
import icMail from '@iconify/icons-ic/twotone-mail';
import icCheck from '@iconify/icons-ic/twotone-check';
import { Docente } from 'src/app/models/docente';
@Component({
  selector: 'vex-docente-create-update',
  templateUrl: './docente-create-update.component.html',
  styleUrls: ['./docente-create-update.component.scss']
})
export class DocenteCreateUpdateComponent implements OnInit {
  maxDate=new Date();
  date = new Date();
  form: FormGroup;
  mode: "create" | "update" = "create";
  icMoreVert = icMoreVert;
  icClose = icClose;
  icDelete = icDelete;
  icPerson = icPerson;
  icMail = icMail;
  icCheck = icCheck;
  icPhone = icPhone;
  constructor( @Inject(MAT_DIALOG_DATA) public defaults: any,
  private dialogRef: MatDialogRef<DocenteCreateUpdateComponent>,
  private fb: FormBuilder) { }

  ngOnInit() {
    if (this.defaults) {
      this.mode = "update";
    } else {
      this.date.setDate(this.date.getDate());
      this.defaults = {} as Docente;
    }
      this.form = this.fb.group({
      idDocente:this.defaults.id||"",
      nombreDocente:[this.defaults.nombreDocente||"",Validators.required],
      apellidoDocente:[this.defaults.apellidoDocente||"",Validators.required],
      telefonoDocente:[this.defaults.telefonoDocente||"",Validators.required],
      correoDocente:[this.defaults.correoDocente||"",Validators.required]
    }
    );
  }
  save() {
    if (this.mode === "create") {
      this.createDocente();
    } else if (this.mode === "update") {
      this.updateDocente();
    }
  }
  createDocente() {
    const docente = this.form.value;
    this.dialogRef.close(docente);
  }
  
  updateDocente() {
    const docente = this.form.value;
    this.dialogRef.close(docente);
  }
  isCreateMode() {
    return this.mode === "create";
  }

  isUpdateMode() {
    return this.mode === "update";
  }

}
