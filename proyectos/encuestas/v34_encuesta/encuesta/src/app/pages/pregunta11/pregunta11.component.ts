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
            pregunta011: new FormControl( '' , Validators.required) ,
            id: new FormControl( '' , Validators.required )
          });


  constructor (private router: Router ,
               public firestoreService: FirestoreService,
               public informacionService: InformacionService) {
  this.newPregunta11Form.setValue({
    id: '' ,
    pregunta011: ''
    });

  }

ngOnInit() {}

public newPregunta11( form , documentId = this.documentId ) {
  const data = {
    pregunta011: form.pregunta011
    };
this.firestoreService.createPregunta11(data).then( ( ) => {
  console.log('Se guardo la informacion');
  this.newPregunta11Form.setValue({
    pregunta011: '' ,
    id: ''
  });
}, (error) => {
  console.error(error);
});
this.router.navigateByUrl('/pregunta12');
// this.despedida.despedida();
}

seleccionar() {}

}