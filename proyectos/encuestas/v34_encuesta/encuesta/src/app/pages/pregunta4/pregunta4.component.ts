import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InformacionService } from '../../services/informacion.service';
import { FirestoreService } from '../../services/firestore/firestore.service';


@Component({
  selector: 'app-pregunta4',
  templateUrl: './pregunta4.component.html',
  styleUrls: ['./pregunta4.component.css']
})
export class Pregunta4Component implements OnInit {

  lb_si = 'Si';
  lb_no = 'No';

  public pregunta4 = [];
  public documentId = null;
  public currentStatus = 1;
  public newPregunta4Form = new FormGroup({
    pregunta04: new FormControl( '' , Validators.required ),
    id: new FormControl( '' , Validators.required )
  });


  constructor( private router: Router ,
    public informacionService: InformacionService,
    public firestoreService: FirestoreService) {
      this.newPregunta4Form.setValue({
        id: '' ,
        pregunta04: ''
      });
    }

  ngOnInit() {}

  public newPregunta4 ( form, documentId = this.documentId ) {
      const data = {
        pregunta04: form.pregunta04
      };
    this.firestoreService.createPregunta4(data).then( ( ) => {
      console.log('Se guardo la informacion');
      this.newPregunta4Form.setValue({
        pregunta04: '' ,
        id: ''
      });
    }, (error) => {
      console.error(error);
    });
  this.router.navigateByUrl('/pregunta5');
  }

  seleccionar() {}

}
