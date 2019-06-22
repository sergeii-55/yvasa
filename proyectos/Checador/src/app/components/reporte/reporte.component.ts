import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import 'firebase/database';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})


export class ReporteComponent implements OnInit {

  constructor(
    public afs: AngularFirestore,
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone,
    
  ) { }
  public reporte: []

  ngOnInit() {
    //carga el JSON con el reporte guardado
    let carta = JSON.parse(localStorage.getItem('reporteCard'));
    this.reporte = carta;
  }

}
