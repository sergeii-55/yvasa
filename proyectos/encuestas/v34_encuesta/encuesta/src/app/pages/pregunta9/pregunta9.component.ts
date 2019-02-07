import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { InformaciónService } from 'src/app/services/informacion.service';

@Component({
  selector: 'app-pregunta9',
  templateUrl: './pregunta9.component.html',
  styleUrls: ['./pregunta9.component.css']
})
export class Pregunta9Component implements OnInit {

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
  public newPregunta9Form = new FormGroup({
    pregunta09: new FormControl( '' , Validators.required ) ,
    id: new FormControl( '' )
  });


  constructor(private router: Router ,
              public firestoreService: FirestoreService,
              public informacionService: InformaciónService) {
      this.newPregunta9Form.setValue({
        id: '' ,
        pregunta09: ''
      });
  }

  ngOnInit() {}

public newPregunta9( form ) {
   const data = {
    pregunta09: form.pregunta09
    };
this.firestoreService.createPregunta9(data)
 {
  console.log('Información de pregunta 9 guardada con éxito');
  this.newPregunta9Form.setValue({
    pregunta09: '' ,
    id: ''
  });
}; (error) => {
  console.error(error);
};
this.router.navigateByUrl('/pregunta10');
 }



  seleccionar() {
  }
}
