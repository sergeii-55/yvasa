import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Tarjeta } from '../../shared/services/tarjeta';
import * as firebase from 'firebase/app';

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
  public registro: any;
  
// BDD   
public db = firebase.firestore(); //linea temporal //no borrar//
// variables que consolidan el query para consulta
// obtenemos la info del usuario del storage del dispositivo
public user = JSON.parse(localStorage.getItem('user'));
    //fecha completa
    public anio = new Date();
    // solo año
    public year = new Date().getFullYear().toString();
    //preparacion identica al de menu.component.ts para busqueda
    public meses: string[] = ["01_Enero", "02_Febrero", "03_Marzo", "04_Abril", "05_Mayo", "06_Junio", "07_Julio", "08_Agosto", "09_Septiembre", "10_Octubre", "11_Noviembre", "12_Diciembre", ];
    public mesActual = this.meses[this.anio.getMonth()];
    //se preparan las variables para que se usaran en los datos de la tarjeta
    public semaMo = moment().week(); //numero de semana
    public semana = 'Semana'+this.semaMo;
      //arreglo para dias en espanol
      public dias: string[] = ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"];
      //orden de dia para sorteo
      public orden: string[] = ["7","1","2","3","4","5","6"];
      //dia actual
      public estamos = moment().format('DD');
      public diaMo = this.dias[this.anio.getDay()]+"_"+this.estamos;

      //variables para reporte diario
      public extra = moment();
      public Lu = "Lunes_"+this.extra.isoWeekday(1).date();
      public Ma = "Martes_"+this.extra.isoWeekday(2).date();
      public Mi = "Miercoles_"+this.extra.isoWeekday(3).date();
      public Ju = "Jueves_"+this.extra.isoWeekday(4).date();
      public Vi = "Viernes_"+this.extra.isoWeekday(5).date();
      public Sa = "Sabado_"+this.extra.isoWeekday(6).date();
      public Do = "Domingo_"+this.extra.isoWeekday(7).date();



  ngOnInit() {
    this.coords();//libera el error de JS de conversion de tipo object
    this.existenRegistros();
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

    //variable para tiempo
    var year = new Date();
          
      var entradaMo = moment().format('HH:mm:ss'); //Hora actual del usuario para el checado
      var entradaCOMP = moment();
      var hoy = moment();
      hoy.set({hour:8,minute:0,second:0,millisecond:0});
          //condicion if, si no pasa de las 8, mandara "sin retraso"
          var pasa = moment(entradaCOMP).isAfter(hoy, 'hours');
              if (pasa == false) 
              { 
                var retraso = "SIN RETRASO";
              }else if (pasa == true) 
              {// calculo para sacar los minutos de retraso // TODO --"parece estar implementado"-- debera implementarse para cuando sea menor a las 8:00 am
                 var retraso = moment().subtract(8, "hours").format('HH:mm:ss').toString();
              }
    //codigo de periodo de semana 
    var now = moment();
    var monday = now.clone().weekday(1).set({hour:0,minute:0,second:0,millisecond:0}).toString(); //Monday 
    var sunday = now.clone().weekday(7).set({hour:23,minute:59,second:59,millisecond:0}).toString(); //Sunday 

    //query de envio de datos x medio del AngularFirestoreDocument
    const userRef: AngularFirestoreDocument<any> = this.afs.collection(year.getFullYear().toString()).doc(this.mesActual).collection('Semana'+this.semaMo).doc(this.user.displayName).collection(this.diaMo).doc("Entrada");
    //se prepara laclase tarjeta a mandar
    const tarjeta: Tarjeta = { 
      dia:this.diaMo, //dia actual
      entrada:entradaMo,//hora de checada
      // TODO --- aqui trabajamos con el fingerprintJS para capturar datos no existentes como el area
      grupo:"sistemas", // TODO --- falta como separarlos
      latitud:this.LAT, //latitud
      longitud:this.LON, //longitud
      nombre:this.user.displayName,//nombre completo de usuario
      periodo_de:monday, //inicio de semana actual segun fecha actual
      periodo_a:sunday,  //fin de semana actual segun fecha actual
      retraso:retraso,  //calculo de minutos retrasados
      salida:null, //queda null por ser tarjeta de entrada
      semana:this.semaMo, //numero de semana
      // TODO --- campo xtra1 sera para locacion del usuario
      xtra1:"", //campo 1 extra para futuras implementaciones ;-)
      diaNO:this.orden[year.getDay()],  //captura orden para sorteo de reportes o tablas
      // TODO --- capturar MAC address  -- no aplica. x seguridad? ;-(
      // FIXME --- trabajar con fingerprintJS para adecuar una MAC
    } 
    
    //regresa la consulta y con merge la fuciona(en caso de exitir en servidor. la reemplaza)
    try {
      userRef.set(tarjeta, {
        merge: true
      });
      Swal.fire({
        type: 'success',
        title: 'Registrado!',
        text: 'tu checada de Entrada a sido exitosa',
        confirmButtonColor: '#028e00',
        animation: true
      });
    }
    catch (error) {
      window.alert(error);
    }
   // TODO --- reload page script (para activar el reporte de semana)
  } // fin de checarEntrada()
  ChecarSalida(){
    //TODO --- revisar si se requiere implementar el NO checar la salida si no se a checado primero la entrada
    this.coords();// extrae latitud y longitud nuevas

     //variable para tiempo
     var year = new Date();

    var salidaMo = moment().format('HH:mm:ss'); //Hora actual para el checado
      
    //codigo de periodo de semana 
    var now = moment();
    var monday = now.clone().weekday(1).set({hour:0,minute:0,second:0,millisecond:0}).toString(); //Monday 
    var sunday = now.clone().weekday(7).set({hour:23,minute:59,second:59,millisecond:0}).toString(); //Sunday 

    //query de envio de datos x medio del AngularFirestoreDocument
    const userRef: AngularFirestoreDocument<any> = this.afs.collection(year.getFullYear().toString()).doc(this.mesActual).collection('Semana'+this.semaMo).doc(this.user.displayName).collection(this.diaMo).doc("Salida");
    //se prepara laclase tarjeta a mandar
    const tarjeta: Tarjeta = { 
      dia:this.diaMo, //dia actual
      entrada:null,//queda null por ser tarjeta de salida
      // TODO --- aqui trabajamos con el fingerprintJS para capturar datos no existentes como el area
      grupo:"sistemas", // TODO --- falta como separarlos
      latitud:this.LAT, //latitud
      longitud:this.LON, //longitud
      nombre:this.user.displayName,//nombre completo de usuario
      periodo_de:monday, //inicio de semana actual segun fecha actual
      periodo_a:sunday,  //fin de semana actual segun fecha actual
      retraso:null,  //calculo de minutos retrasados
      salida:salidaMo, //hora actual
      semana:this.semaMo, //numero de semana
      // TODO --- campo xtra1 sera para locacion del usuario
      xtra1:"", //campo 1 extra para futuras implementaciones ;-)
      diaNO:this.orden[year.getDay()],  //captura orden para sorteo de reportes o tablas
      // TODO --- capturar MAC address  -- no aplica. x seguridad? ;-(
      // FIXME --- trabajar con fingerprintJS para adecuar una MAC
    } 
    
    //regresa la consulta y con merge la fuciona(en caso de exitir en servidor. la reemplaza)
    try {
      userRef.set(tarjeta, {
        merge: true
      });
      Swal.fire({
        type: 'success',
        title: 'Registrado!',
        text: 'tu checada de Salida a sido exitosa',
        confirmButtonColor: '#028e00',
        animation: true
      });
    }
    catch (error) {
      window.alert(error);
    }
   // TODO --- reload page script (para activar el reporte de semana)
  }

  existenRegistros(){
        //* 1 revisar que existan registros en BDD segun la semana en la que se este ingresando en la App
        var existenReg = this.db.collection(this.year)
        .doc(this.mesActual)
        .collection(this.semana)
        .doc(this.user.displayName)
        .collection(this.diaMo)
        .where("semana","==", this.semaMo);

        existenReg.get()
        .then(function (doc) {
          if(doc.empty){
            //! no existen registros
            // TODO --- desabilitar boton de reporte de semana
            this.registro=1;
          }
          else{
            //! si existen registros
            // TODO --- habilitar boton de reporte de semana
            // variable global a true, que existen registros
            this.registro=0;
          }
        })
     }

  reporte(){
      if (this.registro==true) {
        
        this.afs.collection(this.year)
        .doc(this.mesActual)
        .collection(this.semana)
        //llega al nombre
        .doc(this.user.displayName)
        //ciclo FOR para dias
        .collection('Lunes_03')
        //ciclo para entrada / salida
        .doc('Entrada').get().toPromise()
        .then((snapshot) => {
              console.log(snapshot.data());
             });

      }else{
        
      }
    }
  
  }

// .doc('Entrada' || 'Salida')
        // .get()
        // .then(function(doc) {
        //   //* 1.2 si SI existen registros, habilita boton de reporte de semana
        //   //* 1.3 si SI existen registros, crea reporte
        //   if (doc.exists) {
        //     console.log("SI existen registros");
        //   }
        //   //* 1.4 si NO existen registros, deshabilita boton de reporte de semana
        //   else{  
        //     console.log("NO existen registros");
        //   }
        // })
        
        
        
          
           // en esta seccion nos traemos todo el JSON
        // this.afs.collection(year)
        // .doc(mesActual)
        // .collection(semana)
        // //llega al nombre
        // .doc(user.displayName)
        // //ciclo FOR para dias
        // .collection('Lunes_03')
        // //ciclo para entrada / salida
        // .doc('Entrada').get().toPromise()
        // .then((snapshot) => {
        //       console.log(snapshot.data());
        //      });
   
            //crea objeto
          //      var myObj = {
          //        firstname: "sergeii",
          //        lastname: "villa",
          //        website: "https://www.ajillo.com"
          //    }
          //    //guarda
          //    localStorage.setItem('saved', JSON.stringify(myObj));
          //    //lee objeto
          //   console.log("JSON saved  ==>>",JSON.parse(localStorage.getItem('saved')));
  
