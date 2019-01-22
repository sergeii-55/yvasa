import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InformacionService } from 'src/app/services/informacion.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirestoreService } from '../../services/firestore/firestore.service';


@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent implements OnInit {

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
    r1: new FormControl('' , Validators.required),
    r2: new FormControl('' , Validators.required),
    r3: new FormControl('' , Validators.required),
    r4: new FormControl('' , Validators.required),
    r5: new FormControl('' , Validators.required),
    id: new FormControl( '' , Validators.required)

   });

constructor(private router: Router,
          public informacionService: InformacionService,
          public firestoreService: FirestoreService) {
this.newPregunta2Form.setValue({
  id: '',
  r1: '',
  r2: '',
  r3: '',
  r4: '',
  r5: ''
});
}

ngOnInit() {
}

public newPregunta2 ( form, documentId = this.documentId ) {
const data = {
   r1: form.r1,
   r2: form.r2,
   r3: form.r3,
   r4: form.r4,
   r5: form.r5
 };
 this.firestoreService.createPregunta2(data).then( ( ) => {
  console.log('Se guardo la informacion');
  this.newPregunta2Form.setValue({
    r1: '',
    r2: '',
    r3: '',
    r4: '',
    r5: '',
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
