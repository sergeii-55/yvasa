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
  
    // const usuario = JSON.parse(localStorage.getItem('user')).email;
    // const userRef: AngularFirestoreDocument<any> = this.db.collection('users').doc(usuario);
   
    //   userRef.get()
    //   .toPromise()
    //   .then(doc => {
    //     if (doc.exists) {
    //       window.alert('Siiiiii');
    //     } else {
    //       window.alert('Noooooooooo');
    //     }
    //   })


    
    if(this.authService.isLoggedIn !== true ) {
      // TODO --- crear sweetalert aqui 
      window.alert("No estas autorizado a este Acceso!   SECURE-INNER-PAGES");
       this.router.navigate(['sign-in'])
    }else if(this.authService.isLoggedIn == true && JSON.parse(localStorage.getItem('user')).email.replace(/.*@/, "")!=="yvasa.com") //
    {
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
      // //ESTA REGISTRADO?
      //    // hacer la consulta para verificar si existe el correo solicitado
      //    const userRef: AngularFirestoreDocument = this.afs.doc(`users/${JSON.parse(localStorage.getItem('user')).email}`);
      //    userRef.valueChanges().subscribe(res=>{
      //      // si ya esta dado de alta lo manda al menu
      //    if(res){
      //      this.ngZone.run(() => {
      //        this.router.navigate(['menu']);
      //      })
      //    }
      //    // si no esta dado de alta lo manda al registro inicial de users
      //    else{
      //     this.router.navigate(['sign-in']);
      //      // mensaje de registro o cancelacion
      //      Swal.fire({
      //        title: 'Este usuario no esta registrado',
      //        text: "Deseas darlo de alta?",
      //        type: 'error',
      //        showCancelButton: true,
      //        confirmButtonColor: '#3085d6',
      //        cancelButtonColor: '#d33',
      //        confirmButtonText: 'Si, registrarlo'
      //      }).then((result) => {
      //        if (result.value) {
      //          this.ngZone.run(() => {
      //            this.router.navigate(['mail-user']);
      //          })
      //        }
      //      })
      //    }
      //    });
     // this.router.navigate(['menu']);
      window.alert("LLego al menu por que si estaba en la BDD");
    }
    return true;
  }
}