import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs';
import { auth } from 'firebase/app';
import { User } from "./user";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userData: Observable<firebase.User>;
  user: User;

  constructor(
    private angularFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    public afAuth: AngularFireAuth) {
    this.userData = angularFireAuth.authState;
    this.afAuth.authState.subscribe(user => {
      this.user = user;
  })
   }

   /* Sign up */
  SignUp(email: string, password: string) {
    this.angularFireAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log('Successfully signed up!', res);
      })
      .catch(error => {
        console.log('Something is wrong:', error.message);
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

}
