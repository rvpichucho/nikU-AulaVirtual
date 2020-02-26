import { Injectable, Input } from '@angular/core';


import {Observable, of, throwError, pipe} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';

import { AngularFirestore, SnapshotOptions} from '@angular/fire/firestore';
import { finalize, tap} from 'rxjs/operators';

import { FormControl, FormGroup } from "@angular/forms";



@Injectable({
  providedIn: 'root'
})
export class DeberService {
  constructor( ) { }
  
}
