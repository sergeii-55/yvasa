import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Tarjeta } from 'src/app/shared/services/tarjeta';


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
    public ngZone: NgZone,
  ) { }

  public LAT:any;
  public LON:any;
  
  ngOnInit() {
    this.coords();//libera el error de JS de conversion de tipo object
  }

coords(){
  //opciones para el metodo de getCurrentPosition //capturar latitud y longitud
  var options = {
    enableHighAccuracy: true, //mejora la posicion
    timeout: 5000, //esperar no mas de 5 segs
    maximumAge: 5000 //segundos de info guardada en dispositvo ...imagen no mas vieja a 5 segs
  };
  navigator.geolocation.getCurrentPosition((pos: { coords: any }) => {
    var x = pos.coords; //pasa los valores de pos a "x", para que no se pierdan en el transcurso
    this.LAT = x.latitude;
    this.LON = x.longitude;
  },null,options); //valores extras, en null puede llevar un catch de error (mirar documentacion de mozilla de este metodo)
}

  // metodo que se activa al presionar el boton y llevar la informacion de entrada
  ChecarEntrada() {

        this.coords();// extrae latitud y longitud nuevas

    // obtenemos la info del usuario previamente guardada en el .TS de auth.service. lo sacamos del storage del dispositivo
    var user = JSON.parse(localStorage.getItem('user'));
    //variable para tiempo y conversion de meses a espanol
    var year = new Date();
    //lleva el 01_... - numero al inicio para un mejor acomodo en la BDD de firebase de google
    var meses: string[] = ["01_Enero", "02_Febrero", "03_Marzo", "04_Abril", "05_Mayo", "06_Junio", "07_Julio", "08_Agosto", "09_Septiembre", "10_Octubre", "11_Noviembre", "12_Diciembre", ];
    var mesActual = meses[year.getMonth()];
    //se preparan las variables para que se usaran en los datos de la tarjeta
      var semaMo = moment().week(); //numero de semana
      var diaMo = moment().format('dddd'); //dia actual (Monday, Thursday....) //TODO --- pasarlo a espanol
      var entradaMo = moment().format('HH:mm:ss'); //Hora actual para el checado
      var entradaCOMP = moment();
      var hoy = moment();
      hoy.set({hour:8,minute:0,second:0,millisecond:0});
          //condicion if, si no pasa de las 8, mandara "sin retraso"
          var pasa = moment(entradaCOMP).isAfter(hoy, 'hours');
              if (pasa == false) 
              { 
                var retraso = "SIN RETRASO";
              }else if (pasa == true) 
              {// calculo para sacar los minutos de retraso // TODO --- debera implementarse para cuando sea menor a las 8:00 am
                 var retraso = moment().subtract(8, "hours").format('HH:mm:ss').toString();
              }
    //codigo de periodo de semana 
    var now = moment();
    var monday = now.clone().weekday(1).set({hour:0,minute:0,second:0,millisecond:0}).toString(); //Monday 
    var sunday = now.clone().weekday(7).set({hour:23,minute:59,second:59,millisecond:0}).toString(); //Sunday 

    //query de envio de datos x medio del AngularFirestoreDocument
    const userRef: AngularFirestoreDocument<any> = this.afs.collection(year.getFullYear().toString()).doc(mesActual).collection('Semana'+semaMo).doc(user.displayName).collection(diaMo).doc("Entrada");
    //se prepara laclase tarjeta a mandar
    const tarjeta: Tarjeta = { 
      dia:diaMo, //dia actual
      entrada:entradaMo,//hora de checada
      // FIXME --- aqui trabajamos con el fingerprintJS para capturar datos no existentes como el area
      grupo:"sistemas", // TODO --- falta como separarlos
      latitud:this.LAT, //latitud
      longitud:this.LON, //longitud
      nombre:user.displayName,//nombre completo de usuario
      periodo_de:monday, //inicio de semana actual segun fecha actual
      periodo_a:sunday,  //fin de semana actual segun fecha actual
      retraso:retraso,  //calculo de minutos retrasados
      salida:null, //queda null por ser tarjeta de entrada
      semana:semaMo, //numero de semana
      xtra1:"", //campo 1 extra para futuras implementaciones ;-)
      xtra2:""  //campo 2 extra para futuras implementaciones ;-)
      // TODO --- capturar MAC address  -- no aplica. x seguridad? ;-(
      // FIXME --- trabajar con fingerprintJS para adecuar una MAC
    } 
    
    //regresa la consulta y con merge la fuciona(en caso de exitir en servidor. la reemplaza)
    try {
      userRef.set(tarjeta, {
        merge: true
      });
      Swal.fire({
        title: 'Registrado!',
        text: 'tu checada de Entrada a sido exitosa  -  latitud:' + this.LAT + " - longitud:" + this.LON,
        imageUrl: './assets/mapa.png',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'map.google.2019', //TODO --- crear mapa con API de google con LAT y LON
        confirmButtonColor: '#028e00',
        animation: false
      });
    }
    catch (error) {
      window.alert(error);
    }
   // TODO --- desabilitar boton de checar entrada y cambiarlo a "Entrada ya a sido checada"
  } // fin de checarEntrada()
  ChecarSalida(){
    
  }

  Entrada(){
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

}
