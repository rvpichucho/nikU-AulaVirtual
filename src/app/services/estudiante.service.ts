import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Estudiante } from '../models/estudiante';

import { AngularFirestore} from '@angular/fire/firestore';
import {AppModule } from '../app.module';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  itemValue = '';
  items: Observable<any[]>;

  constructor(public db : AngularFirestore) {
   
   }
   createEstudiante(estudiante)
   {
     console.log(estudiante);
    
    this.db.collection('estudiante').doc(this.db.createId()).set(Object.assign({},estudiante));
  }


}
