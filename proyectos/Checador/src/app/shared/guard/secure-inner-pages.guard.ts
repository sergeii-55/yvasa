import { Injectable, NgZone } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from "../services/auth.service";
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import Swal from 'sweetalert2';
import { firestore } from 'firebase';
import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})

export class SecureInnerPagesGuard implements CanActivate {

  
  constructor(
    public authService: AuthService,
    public router: Router,
    public afs: AngularFirestore,
    public ngZone: NgZone,
    private db: AngularFirestore
  ) { }

  

  canActivate(
    
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    if(this.authService.isLoggedIn !== true ) {
      //seguridad de rutas por injeccion a URL
      Swal.fire({
        type: 'error',
        title: 'Acceso Denegado!',
        text: 'Debes Iniciar sesion para poder entrar!',
        animation: true
      });
       this.router.navigate(['sign-in'])
    }else if(this.authService.isLoggedIn == true && JSON.parse(localStorage.getItem('user')).email.replace(/.*@/, "")!=="yvasa.com") //
    {
      //TODO --- sweetalert
      window.alert("No estas autorizado a este Acceso  -- SECURE-INNER-PAGES -- logeado sin el .yvasa.com!");
      this.router.navigate(['sign-in'])
    }
                //esta logeado?si       ::  termina en @yvasa.com?si                                                               ::  esta registrado?si   >>  entra a menu
    else if(this.authService.isLoggedIn == true &&
      JSON.parse(localStorage.getItem('user')).email.replace(/.*@/, "") =="yvasa.com" 
      // &&
      // this.entro==true
    )
    {
      
    }
    return true;
  }
}