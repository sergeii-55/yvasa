import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DespedidaService {

fin = true;

  constructor(private router: Router) {
    this.despedida();
   }

  despedida() {

    this.fin = true;
    setTimeout( () => {

    }, 2000);
    this.router.navigateByUrl('/pregunta');
  }

}
