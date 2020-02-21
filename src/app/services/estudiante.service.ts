import { Injectable } from '@angular/core';
import {Observable, of, throwError, pipe} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Estudiante } from '../models/estudiante';


import { map } from 'rxjs/operators';
import { AngularFirestore} from '@angular/fire/firestore';
import { FormControl, FormGroup } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
 
  constructor(public firestore : AngularFirestore) {
    
   }
   
   createEstudiante(data)
   {
    return new Promise((resolve, reject) =>{
      this.firestore
          .collection("estudiante")
          .add(data)
          .then(res => {}, err => reject(err));
      });
  }
  getEstudiante() {
    return this.firestore.collection<Estudiante>('estudiante').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Estudiante;
        const id = a.payload.doc.id;
        //data.idEstudiante = a.payload.doc.id;
        return {id,...data};
      }))
    );
    /*.pipe(
      retry(1),
      catchError(this.errorHandl)
    )*/
  }
  updateEstudiante(data){
    return this.firestore.collection("estudiante").doc(data.idEstudiante).set(data);
  }
  deleteEstudiante(data){
    return this.firestore.collection("estudiante").doc(data.id).delete();
  }
  getbyID(id: string){
    
    
      const productsDocuments = this.firestore.collection<Estudiante[]>('estudiante');
      return productsDocuments.snapshotChanges()
        .pipe(
          map(changes => changes.map(({ payload: { doc } }) => {
            const data = doc.data();
            const id = doc.id
            return { id, ...data };
          })),
          map((products) => products.find(doc => doc.id === id)))
          
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
