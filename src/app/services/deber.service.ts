import { Injectable, Input } from '@angular/core';
import {Observable, of, throwError, pipe} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Deber } from '../models/deber';
import { AngularFirestore, SnapshotOptions} from '@angular/fire/firestore';
import { finalize, tap} from 'rxjs/operators';
import { FormControl, FormGroup } from "@angular/forms";
//
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
//
import { Component, OnInit,ViewEncapsulation } from '@angular/core';

import { MatDialog } from '@angular/material';
//

@Injectable({
  providedIn: 'root'
})
export class DeberService {
  task: AngularFireUploadTask;
  profileUrl: Observable<string | null>;
  constructor(private storage: AngularFireStorage,private  firestore: AngularFirestore) { }
  //
  createDeber(data)
   {
    data.detalleDeber=null;
    return new Promise<any>((resolve, reject) =>{
      this.firestore
          .collection("deber")
          .add(data)
          .then(res => {}, err => reject(err));
      });
  
  }
  getDeber() {
    return this.firestore.collection<Deber>('deber').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Deber;
        const id = a.payload.doc.id; 
        return {id,...data};
      }))
    );
    /*.pipe(
      retry(1),
      catchError(this.errorHandl)
    )*/
  }
  updateDeber(data){
    data.detalleDeber=null;
    console.log(data);
    return this.firestore.collection("deber").doc(data.idDeber).set(data);
  }
  deleteDeber(data){
    var storageRef = this.storage.ref(data.path);
    console.log(data.path);
    storageRef.delete();
    return this.firestore.collection("deber").doc(data.id).delete();
  }
  getbyID(id: string){
    
  } 
  errorHandl(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }

}
  