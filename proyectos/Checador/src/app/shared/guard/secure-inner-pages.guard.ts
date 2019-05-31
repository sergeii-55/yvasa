import { Injectable, NgZone } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from "../services/auth.service";
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import Swal from 'sweetalert2';
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
        showConfirmButton: false,
        animation: true
      });
       this.router.navigate(['sign-in']);
    }
    return true;
  }
}