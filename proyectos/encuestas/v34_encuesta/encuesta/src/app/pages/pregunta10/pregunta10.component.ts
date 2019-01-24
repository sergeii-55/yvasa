import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { InformacionService } from 'src/app/services/informacion.service';

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

  public preguntas = [];
  public documentId = null;
  public currentStatus = 1;
  public newPregunta10Form = new FormGroup({
    pregunta010: new FormControl( '' , Validators.required ) ,
    id: new FormControl( '' , Validators.required )
  });

  constructor(private router: Router ,
              public firestoreService: FirestoreService,
              public informacionService: InformacionService) {
    this.newPregunta10Form.setValue({
      id: '' ,
      pregunta010: ''
    });
  }
  ngOnInit() {}

  public newPregunta10( form , documentId = this.documentId ) {
    const data = {
      pregunta010: form.pregunta010
      };
  this.firestoreService.createPregunta10(data).then( ( ) => {
    console.log('Se guardo la informacion');
    this.newPregunta10Form.setValue({
      pregunta010: '' ,
      id: ''
    });
  }, (error) => {
    console.error(error);
  });
  this.router.navigateByUrl('/pregunta11');
  }
  seleccionar() {}

}