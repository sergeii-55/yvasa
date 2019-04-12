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
    public ngZone: NgZone // NgZone service to remove outside scope warning
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
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // 2.    Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
    .then((result) => {
      // FIXME  ---  revisar que no entre a este ciclo cuando se guarda el usuario, o revisar el log out
      // if (result.additionalUserInfo.profile.hd == "yvasa.com") 
      // {
          // hacer la consulta para verificar si existe el correo solicitado
        const userRef: AngularFirestoreDocument = this.afs.doc(`users/${result.user.email}`);
        userRef.valueChanges().subscribe(res=>{
          // si ya esta dado de alta lo manda al menu
        if(res){
          this.ngZone.run(() => {
            this.router.navigate(['menu']);
          })
        }
        // si no esta dado de alta lo manda al registro inicial de users
        else{
          // mensaje de registro o cancelacion
          Swal.fire({
            title: 'Este usuario no esta registrado',
            text: "Deseas darlo de alta?",
            type: 'error',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, registrarlo'
          }).then((result) => {
            if (result.value) {
              this.ngZone.run(() => {
                this.router.navigate(['mail-user']);
              })

            }
          })
          
          
      //this.SetUserData(result.user);  //guarda user del result
        }
        } );
        
      
     // this.SetUserData(result.user);
      // }else{ window.alert("Dominio no valido. Ingresa con tu cuenta de @yvasa.com");}
    }).catch((error) => {
      window.alert(error)
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
  // Reporte
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