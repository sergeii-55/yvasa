import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';


@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})


export class ReporteComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone,
   
  ) { }

  ngOnInit() {
    var db = firebase.firestore();

    db.collection('checadores').get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        console.log(doc.id);
      });
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });

  }

  
  }

  
  //       // BDD
  //       var db = firebase.firestore();

  //       // variables que consolidan el query para consulta
  //       // obtenemos la info del usuario del storage del dispositivo
  //       var user = JSON.parse(localStorage.getItem('user'));
        
  //           //fecha completa
  //           var anio = new Date();
  //           // solo año
  //           var year = new Date().getFullYear().toString();
  //           //preparacion identica al de menu.component.ts para busqueda
  //           var meses: string[] = ["01_Enero", "02_Febrero", "03_Marzo", "04_Abril", "05_Mayo", "06_Junio", "07_Julio", "08_Agosto", "09_Septiembre", "10_Octubre", "11_Noviembre", "12_Diciembre", ];
  //           var mesActual = meses[anio.getMonth()];
  //           //se preparan las variables para que se usaran en los datos de la tarjeta
  //           var semaMo = moment().week(); //numero de semana
  //           var semana = 'Semana'+semaMo;
  //             //arreglo para dias en espanol
  //             var dias: string[] = ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"];
  //             //orden de dia para sorteo
  //             var orden: string[] = ["7","1","2","3","4","5","6"];
  //             //dia actual
  //             var estamos = moment().format('DD');
  //             var diaMo = dias[anio.getDay()]+"_"+estamos;
    
  //       db.collection(year)
  //       .doc(mesActual)
  //       .collection(semana)
  //       .doc('Sergio Jose Villalobos Aguilar')
  //       .collection(diaMo)
  //       .doc('Entrada').get()
  //       .then((snapshot) => {
  //         snapshot.forEach((doc) => {
  //           console.log(doc.id);
  //         });
  //       })
  //       .catch((err) => {
  //         console.log('Error getting documents', err);
  //       });

  // }