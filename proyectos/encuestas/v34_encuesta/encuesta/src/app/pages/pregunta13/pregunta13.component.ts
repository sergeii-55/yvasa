import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { InformaciónService } from '../../services/informacion.service';

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
  selected = "5";
 

  public preguntas = [];
  public documentId = null;
  public currentStatus = 1;
  public newPregunta13Form = new FormGroup({
    pregunta13: new FormControl('' , Validators.required) ,
    id: new FormControl('')
  });

  constructor( private router: Router ,
               public firestoreService: FirestoreService ,
               public informacionService: InformaciónService) {
    this.newPregunta13Form.setValue({
      id: '' ,
      pregunta13: ''
    });
  }

  ngOnInit() {}

  public newPregunta13( form ) {
    const data = {
      pregunta13: form.pregunta13
    };
  this.firestoreService.createPregunta13(data) 
  {
  console.log('Información de pregunta 13 guardada con éxito');
  this.newPregunta13Form.setValue({
    pregunta13: '' ,
    id: ''
  });
}; (error) => {
  console.error(error);
};
this.router.navigateByUrl('/pregunta14');
  }
  
  seleccionar() {}

}
