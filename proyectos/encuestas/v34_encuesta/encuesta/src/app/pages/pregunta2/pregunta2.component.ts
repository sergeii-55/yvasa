import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InformacionService } from 'src/app/services/informacion.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirestoreService } from '../../services/firestore/firestore.service';

@Component({
  selector: 'app-pregunta2',
  templateUrl: './pregunta2.component.html',
  styleUrls: ['./pregunta2.component.css']
})
export class Pregunta2Component implements OnInit {

  lb_uno = 'insatisfecho';
  lb_dos = 'Insatisfecho';
  lb_tres = 'Neutral';
  lb_cuatro = 'Satisfecho';
  lb_cinco = 'satisfecho';
  lb_extremadamente = 'Extremadamente';

      public pregunta2 = [];
      public documentId = null;
      public currentStatus = 1;
      public newPregunta2Form = new FormGroup({
        pregunta02: new FormControl('' , Validators.required),
        id: new FormControl( '' , Validators.required)

       });

  constructor(private router: Router,
              public informacionService: InformacionService,
              public firestoreService: FirestoreService) {
    this.newPregunta2Form.setValue({
      id: '',
      pregunta02: ''
    });
  }

  ngOnInit() {
  }

  public newPregunta2 ( form, documentId = this.documentId ) {
   const data = {
        pregunta02: form.pregunta02
     };
     this.firestoreService.createPregunta2(data).then( ( ) => {
      console.log('Se guardo la informacion');
      this.newPregunta2Form.setValue({
        pregunta02: '',
        id: ''
      });
    }, (error) => {
      console.error(error);
     });
  this.router.navigateByUrl('/pregunta3');
    }

  seleccionar() {
    this.router.navigateByUrl('/pregunta3');
  }

}