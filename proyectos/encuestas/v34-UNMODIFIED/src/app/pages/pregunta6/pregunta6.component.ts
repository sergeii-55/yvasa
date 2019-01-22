import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { InformacionService } from 'src/app/services/informacion.service';

@Component({
  selector: 'app-pregunta6',
  templateUrl: './pregunta6.component.html',
  styleUrls: ['./pregunta6.component.css']
})
export class Pregunta6Component implements OnInit {
  
    lb_si = 'Si';
    lb_no = 'No';

      public preguntas = [];
      public documentId = null;
      public currentStatus = 1;
      public newPregunta6Form = new FormGroup({
        pregunta06: new FormControl( '' , Validators.required ),
        id: new FormControl( '' , Validators.required )
      });


  constructor(private router: Router ,
              public firestoreService: FirestoreService,
              public informacionService: InformacionService) {
      this.newPregunta6Form.setValue({
        id: '' ,
        pregunta06: ''
      });
  }

  ngOnInit() {}

  public newPregunta6( form , documentId = this.documentId ) {
        const data = {
          pregunta06: form.pregunta06
      };

  this.firestoreService.createPregunta6(data).then( ( ) => {
    console.log('Se guardo la informacion');
    this.newPregunta6Form.setValue({
      pregunta06: '' ,
      id: ''
    });
  }, (error) => {
    console.error(error);
  });
  this.router.navigateByUrl('/pregunta7');

  }

  seleccionar() {

  }
}
