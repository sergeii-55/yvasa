import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { InformaciónService } from 'src/app/services/informacion.service';

@Component({
  selector: 'app-pregunta10',
  templateUrl: './pregunta10.component.html',
  styleUrls: ['./pregunta10.component.css']
})
export class Pregunta10Component implements OnInit {

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
  public newPregunta10Form = new FormGroup({
    pregunta10: new FormControl( '' , Validators.required ) ,
    id: new FormControl( '' )
  });

  constructor(private router: Router ,
              public firestoreService: FirestoreService,
              public informacionService: InformaciónService) {
    this.newPregunta10Form.setValue({
      id: '' ,
      pregunta10: ''
    });
  }
  ngOnInit() {}

  public newPregunta10( form ) {
    const data = {
      pregunta10: form.pregunta10
      };
  this.firestoreService.createPregunta10(data)
   {
    console.log('Información de pregunta 10 guardada con éxito');
    this.newPregunta10Form.setValue({
      pregunta10: '' ,
      id: ''
    });
  }; (error) => {
    console.error(error);
  };
  this.router.navigateByUrl('/pregunta11');
  }
  seleccionar() {}

}
