import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { InformaciónService } from 'src/app/services/informacion.service';

@Component({
  selector: 'app-pregunta6',
  templateUrl: './pregunta6.component.html',
  styleUrls: ['./pregunta6.component.css']
})
export class Pregunta6Component implements OnInit {
  
    lb_si = 'Si';
    lb_no = 'No';
    selected = "Si";
   

      public preguntas = [];
      public documentId = null;
      public currentStatus = 1;
      public newPregunta6Form = new FormGroup({
        pregunta06: new FormControl( '' , Validators.required ),
        id: new FormControl( '' )
      });


  constructor(private router: Router ,
              public firestoreService: FirestoreService,
              public informacionService: InformaciónService) {
      this.newPregunta6Form.setValue({
        id: '' ,
        pregunta06: ''
      });
  }

  ngOnInit() {}

  public newPregunta6( form ) {
        const data = {
          pregunta06: form.pregunta06
      };

  this.firestoreService.createPregunta6(data) 
  {
    console.log('Información de pregunta 6 guardada con éxito');
    this.newPregunta6Form.setValue({
      pregunta06: '' ,
      id: ''
    });
  }; (error) => {
    console.error(error);
  };
  this.router.navigateByUrl('/pregunta7');

  }

  seleccionar() {

  }
}
