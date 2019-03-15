import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})


export class MenuComponent implements OnInit {

public LAT: any;
public LON: any;
  
constructor(
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone
  ) { }

  ngOnInit() {}

  openDialog(){
    navigator.geolocation.getCurrentPosition(success)

    function success(pos) {
      let x = pos.coords;
      Swal.fire({
        title: 'Registrado!',
        text: 'tu checada de Entrada a sido exitosa  -  latitud:'+x.latitude+" - longitud:"+x.longitude,
        imageUrl: './assets/mapa.png',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'map.google.2019',
        confirmButtonColor: '#028e00',
        animation: false
      })
    };

 
  }

  closeDialog(){
    navigator.geolocation.getCurrentPosition(success)

    function success(pos) {
      let x = pos.coords;
    Swal.fire({
      title: 'Registrado!',
      text: 'tu checada de Salida a sido exitosa   -  latitud:'+x.latitude+" - longitud:"+x.longitude,
      imageUrl: './assets/mapa.png',
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'map.google.2019',
      confirmButtonColor: '#db0000',
      animation: false
    })
  };
  }

}
