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
  downloadURL : Observable<String>;
  //
  files: File[] = [];
  path : string;
  isHovering: boolean;
  toggleHover(event: boolean) {
    this.isHovering = event;
  }
  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
  private dialogRef: MatDialogRef<UploadTaskComponent>,
  private fb: FormBuilder,
  private storage: AngularFireStorage,private db: AngularFirestore) { }

  ngOnInit() {
    if (this.defaults) {
      this.mode = "update";
    } else {
      this.defaults = {} as Deber;
    }
      this.form = this.fb.group({
      idDeber:this.defaults.id||"",
      nombreDeber:[this.defaults.nombreDeber||"",Validators.required],
      downloadURL:[this.defaults.downloadURL||"",Validators.required],
      path:[this.defaults.path||"",Validators.required],
      descripcionDeber:[this.defaults.descripcionDeber||"",Validators.required],
      calificacionDeber :[this.defaults.calificacionDeber||"",Validators.required],
      detalleDeber: [[this.defaults.detalleDeber]||"",Validators.required],
    }
    );
    
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
    deber.downloadURL = this.downloadURL;
    deber.path = this.path
    console.log(deber);
    this.dialogRef.close(deber);
  }
  updateDeber() {
    const deber = this.form.value;
    this.dialogRef.close(deber);
  }
  isCreateMode() {
    return this.mode === "create";
  }
  isUpdateMode() {
    return this.mode === "update";
  }
  validarVacio(){
    if(this.files[0] != null){ 
      console.log('vacuin');
      var storageRef = this.storage.ref(this.path);
      storageRef.delete();
    }
  }
  onSelect(event) {
    //console.log(event);
    this.files.push(...event.addedFiles);
    const file= this.files[0];
    if(file.type.split('/')[0] !=='image'){
      console.error('archivo no valido');
    }
    this.path = `deber/${new Date().getTime()}_{file.name}`;  
    const ref = this.storage.ref(this.path);
    this.task = this.storage.upload(this.path,file);
    this.percentage = this.task.percentageChanges();
    this.snapshot   = this.task.snapshotChanges();
    this.snapshot   = this.task.snapshotChanges().pipe(
    tap(console.log),
    // The file's download URL
    finalize( async() =>  {
      this.downloadURL = await ref.getDownloadURL().toPromise();
      //this.db.collection('deber').add( { downloadURL: this.downloadURL, path });
    }),
    );
  }
  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }
}
