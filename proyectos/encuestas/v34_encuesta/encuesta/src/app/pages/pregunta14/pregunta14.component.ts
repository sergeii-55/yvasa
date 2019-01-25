import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InformacionService } from '../../services/informacion.service';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { DespedidaService } from '../../services/despedida.service';

@Component({
  selector: 'app-pregunta14',
  templateUrl: './pregunta14.component.html',
  styleUrls: ['./pregunta14.component.css']
})
export class Pregunta14Component implements OnInit {

  lb_si = 'Si';
  lb_no = 'No';

  public pregunta14 = [];
  public documentId = null;
  public currentStatus = 1;
  public newPregunta14Form = new FormGroup({
    pregunta14: new FormControl( '' , Validators.required ),
    id: new FormControl( '' , Validators.required )
  });


  constructor( private router: Router ,
               public informacionService: InformacionService,
               public firestoreService: FirestoreService ,
               public despedida: DespedidaService) {
      this.newPregunta14Form.setValue({
        id: '' ,
        pregunta14: ''
      });
    }

  ngOnInit() {}

  public newPregunta14 ( form ) {
      const data = {
        pregunta14: form.pregunta14
      };
    this.firestoreService.createPregunta14(data)
     {
      console.log('Se guardo la informacion');
      this.newPregunta14Form.setValue({
        pregunta14: '' ,
        id: ''
      });
    }; (error) => {
      console.error(error);
    };
  //this.router.navigateByUrl('/');
  this.despedida.despedida();
  }

  seleccionar() {}

}
