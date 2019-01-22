import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { InformacionService } from '../../services/informacion.service';

@Component({
  selector: 'app-pregunta13',
  templateUrl: './pregunta13.component.html',
  styleUrls: ['./pregunta13.component.css']
})
export class Pregunta13Component implements OnInit {

  lb_uno = 'insatisfecho';
  lb_dos = 'Insatisfecho';
  lb_tres = 'Neutral';
  lb_cuatro = 'Satisfecho';
  lb_cinco = 'satisfecho';
  lb_extremadamente = 'Extremadamente';

  public preguntas = [];
  public documentId = null;
  public currentStatus = 1;
  public newPregunta13Form = new FormGroup({
    pregunta013: new FormControl('' , Validators.required) ,
    id: new FormControl('' , Validators.required)
  });

  constructor( private router: Router ,
               public firestoreService: FirestoreService ,
               public informacionService: InformacionService) {
    this.newPregunta13Form.setValue({
      id: '' ,
      pregunta013: ''
    });
  }

  ngOnInit() {}

  public newPregunta13( form , documentId = this.documentId ) {
    const data = {
      pregunta013: form.pregunta013
    };
  this.firestoreService.createPregunta13(data).then( ( ) => {
  console.log('Se guardo la informacion');
  this.newPregunta13Form.setValue({
    pregunta013: '' ,
    id: ''
  });
}, (error) => {
  console.error(error);
});
this.router.navigateByUrl('/pregunta14');
  }
  
  seleccionar() {}

}
