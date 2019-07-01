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
  dadoDEalta = false;  //guarda valor cuando compara en el checarMAIL() que el usuario no esta dado de alta, para usarlo en secure-inner-pages

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
          //guarda el usuario en userData de manera global para mandarlo llamar en otros formularios
          this.userData = user;
          //guarda el usuario actual logeado
          localStorage.setItem('user', JSON.stringify(this.userData));

          //correo de yvasa.com
          if(JSON.parse(localStorage.getItem('user')).email.replace(/.*@/, "") =="yvasa.com" )
            {
              this.checarMAIL();
            }
            else
            {
              //alerta de dominio no correspondiente a yvasa.com
              Swal.fire({
                type: 'error',
                title: 'Correo Incorrecto!',
                html: `${this.userData.email}`+': no es correcto!',
                footer: 'debes entrar con correo de yvasa.com',
                confirmButtonColor: '#db1111',
                animation: true
              });
              //limpiar el usuario actual en el localstorage 
              //! new logout
                  this.afAuth.auth.signOut().then(() => {
                    localStorage.removeItem('user');
                    this.router.navigate(['sign-in']);
                  })
            }
      }
      else 
          {
            this.afAuth.auth.signOut().then(() => {
              localStorage.removeItem('user');
              this.router.navigate(['sign-in']);
            })
          }
    });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }


  // 1.    Sign in with Google.
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider())
  }

  // 2.    Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
  }

  checarMAIL(){
     /* FIXME bug DOBLE */

     if (this.isLoggedIn !== true){

      Swal.fire({
        title: 'Log In!',
        text: 'ingresa un correo de yvasa.com!',
        confirmButtonColor: '#028e00',
        animation: true
      });

     }
     else
     {
      const usuario = JSON.parse(localStorage.getItem('user')).email;
      const userRef: AngularFirestoreDocument<any> = this.db.collection('users').doc(usuario);
          userRef.get()
          .toPromise()
          .then(doc => {
             if (doc.exists) {
               this.ngZone.run(() => {
                this.router.navigate(['menu']);
                this.dadoDEalta = doc.exists; //true
               })
             } else {
                    //TODO --- implementar a mandar al registro de "user-mail"
                    Swal.fire({
                      title: 'correo NO Registrado!',
                      html: `${usuario}`+': no esta registrado!',
                      footer: 'mail-user en construcción',
                      confirmButtonColor: '#028e00',
                      animation: true
                    });
                    //limpiar usuario de localstorage para no permitir inyeccion de URL
                    localStorage.removeItem('user');
                    //guardar que el usuario no esta dado de alta en variable global
                    this.dadoDEalta = doc.exists; //false
            }
           }).catch((error) => {
              window.alert(error);
           })
     }
     
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
    });
  }
  // menu
  menu() {
    this.ngZone.run(() => {
      this.router.navigate(['menu']);
    });
  }
  // menu
  reporte() {
    this.ngZone.run(() => {
      this.router.navigate(['reporte']);
    });
  }
  // Sign out 
  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    })
  }
  
}