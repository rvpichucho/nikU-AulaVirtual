import { Injectable } from '@angular/core';

import {Observable, of, throwError, pipe} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Docente } from '../models/docente';

import { map } from 'rxjs/operators';
import { AngularFirestore} from '@angular/fire/firestore';
import { FormControl, FormGroup } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class DocenteService {

  constructor(public firestore : AngularFirestore) { }
  createDocente(data)
   {
    return new Promise<any>((resolve, reject) =>{
      this.firestore
          .collection("docente")
          .add(data)
          .then(res => {}, err => reject(err));
      });
  }
  getDocente() {
    return this.firestore.collection<Docente>('docente').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Docente;
        const id = a.payload.doc.id;
        return {id,...data};
      }))
    );
    /*.pipe(
      retry(1),
      catchError(this.errorHandl)
    )*/
  }
  

  updateDocente(data){
    return this.firestore.collection("docente").doc(data.idDocente).set(data);
  }
  deleteDocente(data){
    return this.firestore.collection("docente").doc(data.id).delete();
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
