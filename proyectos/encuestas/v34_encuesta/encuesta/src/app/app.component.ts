import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { InformaciónService } from './services/informacion.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { DespedidaService } from './services/despedida.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  fin = false;
    constructor(private router: Router ,
                private http: HttpClient ,
                public informacionService: InformaciónService,
                private storage: AngularFireStorage,
                private despedida: DespedidaService ) {
                }
    }



