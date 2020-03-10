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
  snapshot: Observable<any>;
  profileUrl: Observable<string | null>;
  constructor(private storage: AngularFireStorage,private  firestore: AngularFirestore) { }
  //
  createDeber(data)
   {
     return new Promise((resolve, reject) => {
     if(data.detalleDeber[0]!=null){
        data.path = `deber/${new Date().getTime()}_${data.detalleDeber[0].name}`;  
        console.log(data.path);
        var ref = this.storage.ref(data.path);
        const upload =this.storage.upload(data.path,data.detalleDeber[0]);
        const sub = upload.snapshotChanges().pipe(
          finalize( async () => {
            try {
              data.downloadURL = await ref.getDownloadURL().toPromise()
              data.detalleDeber = null;
              this.firestore
                .collection("deber")
                .add(data)
            } catch (err) {
              reject(err) 
            }
            sub.unsubscribe()
          })
        ).subscribe((data) => {})
      }    
      else{
        data.detalleDeber = null;
        this.firestore
          .collection("deber")
          .add(data)
      }
    })
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
    if(data.detalleDeber[0] != null){ 
      return new Promise((resolve, reject) => {
        if(data.detalleDeber[0]!=null){
          //
          if(data.path != ""){
            var storageRef = this.storage.ref(data.path);
            storageRef.delete();
          }
          //
          data.path = `deber/${new Date().getTime()}_{data.detalleDeber[0].name}`;  
          var ref = this.storage.ref(data.path);
          const upload =this.storage.upload(data.path,data.detalleDeber[0]);
           const sub = upload.snapshotChanges().pipe(
             finalize( async () => {
               try {
                 data.downloadURL = await ref.getDownloadURL().toPromise()
                 data.detalleDeber = null;
                this.firestore.collection("deber").doc(data.idDeber).set(data);
               } catch (err) {
                 reject(err) 
               }
               sub.unsubscribe()
             })
           ).subscribe((data) => {})
         }    
       })
    }
    else{
      console.log(data);
      return this.firestore.collection("deber").doc(data.idDeber).set(data);
    }
  }
  deleteDeber(data){
    if(data.downloadURL != ""){ 
      var storageRef = this.storage.ref(data.path);
      storageRef.delete();
      return this.firestore.collection("deber").doc(data.id).delete();  
    }
    else{
      return this.firestore.collection("deber").doc(data.id).delete();  
    }
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
  