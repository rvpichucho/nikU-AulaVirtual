import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs';
import { auth } from 'firebase/app';
import { User } from "./user";
import { Router } from "@angular/router";
import firebase from 'firebase';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userData: Observable<firebase.User>;
  user: User;
  user$: Observable<User>;

  constructor(
    private angularFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore) {
    this.userData = angularFireAuth.authState;   
  }

   /* Sign up */
  SignUp(email: string, password: string) {
    firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .then(res => {
      console.log('Ingreso bien!', res);
    })
    .catch(error => {
      console.log('no :( ', error.message);
    });
  }


   /* Sign in */
   SignIn(email: string, password: string) {
    this.angularFireAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log('Successfully signed in!');
      })
      .catch(err => {
        console.log('Something is wrong:',err.message);
      });
  }
 

  // Firebase SignInWithPopup
  OAuthProvider(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
        .then((res) => {
            this.ngZone.run(() => {
              this.updateUserData(res.user);

                this.router.navigate(['dashboard']);
            })
        }).catch((error) => {
            window.alert(error)
        })
}


// Firebase Google Sign-in
SigninWithGoogle() {
  return this.OAuthProvider(new auth.GoogleAuthProvider())
      .then(res => {
          console.log('Successfully logged in!')
      }).catch(error => {
          console.log(error)
      });
}

 // Sign in with Facebook
 FacebookAuth() {
  return this.AuthLogin(new auth.FacebookAuthProvider());
}  

// Auth logic to run auth providers
AuthLogin(provider) {
  return this.afAuth.auth.signInWithPopup(provider)
  .then((result) => {
      console.log('You have been successfully logged in!')
  }).catch((error) => {
      console.log(error)
  })
}

 // Firebase Logout 
 SignOut() {
  return this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['login']);
  })
}

private updateUserData(user){
  const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
  const data: User = {
    uid: user.uid,
    email: user.email,
    roles: {
      admin: true
    }
  }
  return userRef.set(data, { merge: true})
}

private checkAutorizacion(user: User, allowedRoles: string[]): boolean{
  if(!user) return false 
    for (const role of  allowedRoles){
      if(user.roles[role]){
        return true
      }
    }
    return false 
}

canRead(user: User): boolean{
  const allowed = ['admin','docente','estudiante']
  return this.checkAutorizacion(user, allowed)
}

canEdit(user: User): boolean{
  const allowed = ['admin','docente']
  return this.checkAutorizacion(user, allowed)
}
canDelete(user: User): boolean{
  const allowed = ['admin']
  return this.checkAutorizacion(user, allowed)
}

}
