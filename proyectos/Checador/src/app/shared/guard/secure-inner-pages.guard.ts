import { Injectable, NgZone } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from "../services/auth.service";
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class SecureInnerPagesGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router,
    public afs: AngularFirestore,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if(this.authService.isLoggedIn !== true ) {
      // TODO --- crear sweetalert aqui 
      window.alert("No estas autorizado a este Acceso!   SECURE-INNER-PAGES");
       this.router.navigate(['sign-in'])
    }else if(this.authService.isLoggedIn == true && JSON.parse(localStorage.getItem('user')).email.replace(/.*@/, "")!=="yvasa.com") //
    {
      window.alert("No estas autorizado a este Acceso  -- SECURE-INNER-PAGES -- logeado sin el .yvasa.com!");
      this.router.navigate(['sign-in'])
    }else if(this.authService.isLoggedIn == true && JSON.parse(localStorage.getItem('user')).email.replace(/.*@/, "") =="yvasa.com")
    {
      //ESTA REGISTRADO?
         // hacer la consulta para verificar si existe el correo solicitado
         const userRef: AngularFirestoreDocument = this.afs.doc(`users/${JSON.parse(localStorage.getItem('user')).email}`);
         userRef.valueChanges().subscribe(res=>{
           // si ya esta dado de alta lo manda al menu
         if(res){
           this.ngZone.run(() => {
             this.router.navigate(['menu']);
           })
         }
         // si no esta dado de alta lo manda al registro inicial de users
         else{
          this.router.navigate(['sign-in']);
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
         }
         });
    }
    return true;
  }
}