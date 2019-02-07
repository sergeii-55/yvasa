import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { InformaciónService } from 'src/app/services/informacion.service';

@Component({
  selector: 'app-pregunta3',
  templateUrl: './pregunta3.component.html',
  styleUrls: ['./pregunta3.component.css']
})
export class Pregunta3Component implements OnInit {


  lb_uno = 'insatisfecho';
  lb_dos = 'Insatisfecho';
  lb_tres = 'Neutral';
  lb_cuatro = 'Satisfecho';
  lb_cinco = 'satisfecho';
  lb_extremadamente = 'Extremadamente';
  selected = "5";
 

      public pregunta3 = [];
      public documentId = null;
      public currentStatus = 1;
      public newPregunta3Form = new FormGroup({
       pregunta03: new FormControl( '' , Validators.required ),
       id: new FormControl( '' )
      });

  constructor( private router: Router,
               public firestoreService: FirestoreService ,
               public informacionService: InformaciónService) {
  this.newPregunta3Form.setValue({
    id: '' ,
    pregunta03: ''
  });
              }

  ngOnInit() {}

  public newPregunta3( form ) {
      const data = {
        pregunta03: form.pregunta03
      };
    this.firestoreService.createPregunta3(data)
    {
      console.log('Información de pregunta 3 guardada con éxito');
      this.newPregunta3Form.setValue({
        pregunta03: '' ,
        id: '' 
      });
    }; (error) => {
      console.error(error);
    };
  this.router.navigateByUrl('/pregunta4');
  }

  seleccionar() {
  }
}
