import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { InformacionService } from 'src/app/services/informacion.service';

@Component({
  selector: 'app-pregunta8',
  templateUrl: './pregunta8.component.html',
  styleUrls: ['./pregunta8.component.css']
})
export class Pregunta8Component implements OnInit {

  lb_uno = 'insatisfecho';
  lb_dos = 'Insatisfecho';
  lb_tres = 'Neutral';
  lb_cuatro = 'Satisfecho';
  lb_cinco = 'satisfecho';
  lb_extremadamente = 'Extremadamente';

  public preguntas = [];
  public documentId = null;
  public currentStatus = 1;
  public newPregunta8Form = new FormGroup({
    pregunta08: new FormControl( '' , Validators.required ),
    id: new FormControl( '' , Validators.required)
  });

  constructor(private router: Router ,
              public firestoreService: FirestoreService,
              public informacionService: InformacionService) {
    this.newPregunta8Form.setValue({
      id: '' ,
      pregunta08: ''
    });
}

ngOnInit() {}

public newPregunta8( form ) {
   const data = {
    pregunta08: form.pregunta08
    };
this.firestoreService.createPregunta8(data)
 {
  console.log('Informacion de pregunta 8 guardada con exito');
  this.newPregunta8Form.setValue({
    pregunta08: '' ,
    id: ''
  });
}; (error) => {
  console.error(error);
};
this.router.navigateByUrl('/pregunta9');
  }

seleccionar() {

  }
}
