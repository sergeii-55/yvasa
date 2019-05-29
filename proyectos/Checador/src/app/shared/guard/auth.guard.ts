import { Injectable, NgZone } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from "../../shared/services/auth.service";
import { Observable } from 'rxjs';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ){ }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      //aqui se obtiene la terminacion del correo
    if(this.authService.isLoggedIn == true && JSON.parse(localStorage.getItem('user')).email.replace(/.*@/, "") !=="yvasa.com") { 
      this.router.navigate(['sign-in'])
      
      //aviso de login desde el browser que ya tiene usuario registrado en localstorage
      Swal.fire({
        title: 'Registrado!',
        text: 'tu usuario registrado en este browser actual no es de ivasa, ok para reingresar uno correcto',
        confirmButtonColor: '#028e00',
        animation: true
      });

      //limpiar el usuario actual en el localstorage 
      localStorage.removeItem('user');
    }
    return true;
  }

}
