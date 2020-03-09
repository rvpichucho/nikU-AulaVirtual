import { Component, OnInit, Input, ChangeDetectorRef, Inject } from '@angular/core';
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
import { Deber } from 'src/app/models/deber';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'vex-upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.scss']
})
export class UploadTaskComponent implements OnInit {
  form: FormGroup;
  mode: "create" | "update" = "create";
  icMoreVert = icMoreVert;
  icClose = icClose;
  icDelete = icDelete;
  icPerson = icPerson;
  icMail = icMail;
  icCheck = icCheck;
  icPhone = icPhone;
  //
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  download : string;
  //
  files: File[] = [];
  path : string;
  isHovering: boolean;
  //
  toggleHover(event: boolean) {
    this.isHovering = event;
  }
  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
  private snackbar: MatSnackBar,
  private dialogRef: MatDialogRef<UploadTaskComponent>,
  private fb: FormBuilder,
  private storage: AngularFireStorage,private db: AngularFirestore) { }

  ngOnInit() {
    if (this.defaults) {
      this.mode = "update";
      this.download = this.defaults.downloadURL;
      this.path = this.defaults.path;
      this.cargarArchivo();
    } else {
      this.defaults = {} as Deber;
      this.defaults.detalleDeber = [];
    }
      this.form = this.fb.group({
      idDeber:this.defaults.id||"",
      nombreDeber:[this.defaults.nombreDeber||"",Validators.required],
      downloadURL:[this.defaults.downloadURL||"",Validators.required],
      path:[this.defaults.path||"",Validators.required],
      descripcionDeber:[this.defaults.descripcionDeber||"",Validators.required],
      calificacionDeber :[this.defaults.calificacionDeber||"",Validators.required],
      detalleDeber: [this.defaults.detalleDeber||"",Validators.required],
    });
  }
  cargarArchivo(){
    var storageRef = this.storage.ref(this.path);
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
      xhr.onload = function(event) {
        var blob = xhr.response;
      };
      xhr.open('GET', this.download);
      xhr.send();
  }

  save() {
    if (this.mode === "create") {
      this.createDeber();
    } else if (this.mode === "update") {
      this.updateDeber();
    }
  }
  createDeber() {
    const deber = this.form.value;
    deber.detalleDeber = this.files;
    this.dialogRef.close(deber);
  }
  updateDeber() {
    const deber = this.form.value;
    deber.detalleDeber = this.files;
    this.dialogRef.close(deber);
  }
  isCreateMode() {
    return this.mode === "create";
  }
  isUpdateMode() {
    return this.mode === "update";
  }
  onSelect(event) {
    this.files.push(...event.addedFiles);
    const file= this.files[0];
    if(file.type.split('/')[0] !=='application'){
      this.showNotification('Archivo no válido, solo PDF', 'OK');
      this.onRemove(this.files);
    }
  }
  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }
  showNotification(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 5000
    });
  }
}
