import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { FirebaseNameOrConfigToken } from 'angularfire2';
import { InformacionService } from '../../services/informacion.service';



@Component({
  selector: 'app-pregunta11',
  templateUrl: './pregunta11.component.html',
  styleUrls: ['./pregunta11.component.css']
})
export class Pregunta11Component implements OnInit {

  lb_uno = 'insatisfecho';
  lb_dos = 'Insatisfecho';
  lb_tres = 'Neutral';
  lb_cuatro = 'Satisfecho';
  lb_cinco = 'satisfecho';
  lb_extremadamente = 'Extremadamente';

          public preguntas = [];
          public documentId = null;
          public currentStatus = 1;
          public newPregunta11Form = new FormGroup({
            pregunta11: new FormControl( '' , Validators.required) ,
            id: new FormControl( '' , Validators.required )
          });


  constructor (private router: Router ,
               public firestoreService: FirestoreService,
               public informacionService: InformacionService) {
  this.newPregunta11Form.setValue({
    id: '' ,
    pregunta11: ''
    });

  }

ngOnInit() {}

public newPregunta11( form ) {
  const data = {
    pregunta11: form.pregunta11
    };
this.firestoreService.createPregunta11(data)
 {
  console.log('Informacion de pregunta 11 guardada con exito');
  this.newPregunta11Form.setValue({
    pregunta11: '' ,
    id: ''
  });
}; (error) => {
  console.error(error);
};
this.router.navigateByUrl('/pregunta12');
}

seleccionar() {}

}
