import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { User } from 'src/app/shared/services/user';
import { Tarjeta } from 'src/app/shared/services/tarjeta';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})


export class MenuComponent implements OnInit {

constructor(
    public afs: AngularFirestore,
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone
  ) { }

  public LAT:any;
  public LON:any;
  
  ngOnInit() {
    navigator.geolocation.getCurrentPosition((pos: { coords: any }) => {
      let x = pos.coords;
      this.LAT = x.latitude;
      this.LON = x.longitude;
    });
  }
  openDialog(){
      Swal.fire({ 
        title: 'Registrado!',
        text: 'tu checada de Entrada a sido exitosa  -  latitud:'+this.LAT+" - longitud:"+this.LON,
        imageUrl: './assets/mapa.png',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'map.google.2019',
        confirmButtonColor: '#028e00',
        animation: false
      })
  }

  ChecarEntrada(user) {
    //Date.getFullYear();
    var year = new Date();
    var meses: string[] = ["01_Enero", "02_Febrero", "03_Marzo", "04_Abril", "05_Mayo", "06_Junio", "07_Julio", "08_Agosto", "09_Septiembre", "10_Octubre", "11_Noviembre", "12_Diciembre", ];
    var mesActual = meses[year.getMonth()];
        // let dateFormat = require('dateformat');
        // let now = new Date();
        // dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");
    const userRef: AngularFirestoreDocument<any> = this.afs.doc( year.getFullYear()+`/`+mesActual);
    var semaNo = moment().week();
    const tarjeta: Tarjeta = {
      semana:semaNo,
       periodo_de:null, //falta
       periodo_a:null,  //falta
      nombre:user.displayName,
      grupo:"sistemas", //falta como separarlos
      dia:"lunes", //falta identificar que dia es ///intentar usar la libreria de moment
      entrada:08.23,
      salida:null, //queda null por ser tarjeta de entrada
      latitud:this.LAT,
      longitud:this.LON, 
      retraso:5, //falta calcular el sobrante
      xtra1:"",
      xtra2:""
    }
    return userRef.set(tarjeta, {
      merge: true
    })
  }

  closeDialog(){
    Swal.fire({
      title: 'Registrado!',
      text: 'tu checada de Salida a sido exitosa   -  latitud:'+this.LAT+" - longitud:"+this.LON,
      imageUrl: './assets/mapa.png',
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'map.google.2019',
      confirmButtonColor: '#db0000',
      animation: false
    })
  }

}
