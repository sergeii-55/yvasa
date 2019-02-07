import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { InformaciónService } from 'src/app/services/informacion.service';

@Component({
  selector: 'app-pregunta7',
  templateUrl: './pregunta7.component.html',
  styleUrls: ['./pregunta7.component.css']
})
export class Pregunta7Component implements OnInit {

 
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
  public newPregunta7Form = new FormGroup({
    pregunta07: new FormControl( '' , Validators.required ),
    id: new FormControl( '' )
  });

  constructor(private router: Router ,
              public firesoreService: FirestoreService,
              public informacionService: InformaciónService) {
    this.newPregunta7Form.setValue({
      id: '' ,
      pregunta07: ''
    });
 }

 ngOnInit() {}

public newPregunta7( form ) {
    const data = {
      pregunta07: form.pregunta07
    };
this.firesoreService.createPregunta7(data)
{
  console.log('Información de pregunta 7 guardada con éxito');
  this.newPregunta7Form.setValue({
    pregunta07: '' ,
    id: ''
  });
}; (error) => {
  console.error(error);
};
this.router.navigateByUrl('/pregunta8');
  }


seleccionar() {
 }
}
