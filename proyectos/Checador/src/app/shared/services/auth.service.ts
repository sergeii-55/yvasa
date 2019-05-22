import { Injectable, NgZone } from '@angular/core';
import { User } from "../services/user";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any; // Save logged in user data

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,  
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private db: AngularFirestore
  ) {    
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }


  // 1.    Sign in with Google.
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider())
    .then((result) => {
      this.checarMAIL();
    }
    );
    
  }

  // 2.    Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
    .then((result) => {
      
      })
  }

  checarMAIL(){
     const usuario = JSON.parse(localStorage.getItem('user')).email;
      const userRef: AngularFirestoreDocument<any> = this.db.collection('users').doc(usuario);
          userRef.get()
          .toPromise()
          .then(doc => {
             if (doc.exists) {
               this.ngZone.run(() => {
                this.router.navigate(['menu']);
               })
             } else {
              //TODO --- sweetalert de registro nuevo
               window.alert('Noooooooooo');
            }
           }).catch((error) => {
              window.alert(error);
           })
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.email}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      area: "sistemas"
    }
    return userRef.set(userData, {
      merge: true
    })
  }
  // menu
  menu() {
    this.ngZone.run(() => {
      this.router.navigate(['menu']);
    })
  }
  // Sign out 
  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    })
  }
  // Reporte
  Reporte() {
    this.ngZone.run(() => {
      this.router.navigate(['reporte']);
    })
  }
}