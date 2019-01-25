import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { InformacionService } from '../../services/informacion.service';

@Component({
  selector: 'app-pregunta12',
  templateUrl: './pregunta12.component.html',
  styleUrls: ['./pregunta12.component.css']
})
export class Pregunta12Component implements OnInit {

  lb_uno = 'insatisfecho';
  lb_dos = 'Insatisfecho';
  lb_tres = 'Neutral';
  lb_cuatro = 'Satisfecho';
  lb_cinco = 'satisfecho';
  lb_extremadamente = 'Extremadamente';

  public preguntas = [];
  public documentId = null;
  public currentStatus = 1;
  public newPregunta12Form = new FormGroup({
    pregunta12: new FormControl('' , Validators.required) ,
    id: new FormControl('' , Validators.required)

  });

  constructor(private router: Router ,
              public firestoreService: FirestoreService ,
              public informacionService: InformacionService) {
    this.newPregunta12Form.setValue({
      id: '' ,
      pregunta12: ''
    });
}

  ngOnInit() {}

  public newPregunta12( form ) {
    const data = {
      pregunta12: form.pregunta12
    };
    this.firestoreService.createPregunta12(data) 
    {
      console.log('Se guardo la informacion');
      this.newPregunta12Form.setValue({
        pregunta12: '' ,
        id: ''
      });
    };(error) => {
      console.error(error);
    };
    this.router.navigateByUrl('/pregunta13');
  }

  seleccionar() {}
}
