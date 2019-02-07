import { Component, OnInit, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';
import { InformaciónService } from 'src/app/services/informacion.service';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';
import { Button } from 'protractor';

@Component({
  selector: 'app-pregunta1',
  templateUrl: './pregunta1.component.html',
  styleUrls: ['./pregunta1.component.css']
})

export class Pregunta1Component implements OnInit {

  lb_uno = 'insatisfecho';
  lb_dos = 'Insatisfecho';
  lb_tres = 'Neutral';
  lb_cuatro = 'Satisfecho';
  lb_cinco = 'satisfecho';
  lb_extremadamente = 'Extremadamente';
  selected = "5";

    public pregunta1 = [];
    public newPregunta1Form = new FormGroup({
      pregunta01: new FormControl('' , Validators.required),
      id: new FormControl('')
    });

  constructor(private router: Router,
              public informacionService: InformaciónService,
              public firestoreService: FirestoreService) {
  this.newPregunta1Form.setValue({
    id: '',
   pregunta01: ''

  });
}



  ngOnInit() {

  }

public newPregunta1 ( form )
{
    const data = {
        pregunta01: form.pregunta01
        };
    this.firestoreService.createPregunta1(data) 
    {
      console.log('Información de pregunta 1 guardada con éxito');
      this.newPregunta1Form.setValue({
        pregunta01: '',
        id: ''
      });
    }; (error) => {
      console.error(error);
    };
    this.router.navigateByUrl('/pregunta2');


}

seleccionar() {

}

}
