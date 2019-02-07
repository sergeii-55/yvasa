import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InformaciónService } from '../../services/informacion.service';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { DespedidaService } from '../../services/despedida.service';

const Swal = require('sweetalert2')

@Component({
  selector: 'app-pregunta14',
  templateUrl: './pregunta14.component.html',
  styleUrls: ['./pregunta14.component.css']
})

export class Pregunta14Component implements OnInit {
  isButtonVisible = true;
  isButtonNOTVisible = false;
  mensaje : string;

  lb_si = 'Si';
  lb_no = 'No';
  selected = "Si";
 

  public pregunta14 = [];
  public documentId = null;
  public currentStatus = 1;
  public newPregunta14Form = new FormGroup({
    pregunta14: new FormControl( '' , Validators.required ),
    id: new FormControl( '' )
  });

  constructor( private router: Router ,
               public informacionService: InformaciónService,
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
        pregunta14: form.pregunta14 + " - " + this.mensaje
      };

    this.firestoreService.createPregunta14(data)
     {
      console.log('Información de pregunta 14 guardada con éxito');
      this.newPregunta14Form.setValue({
        pregunta14: '' ,
        id: ''
      });
    }; (error) => {
      console.error(error);
    };
  this.router.navigateByUrl('/pregunta15');
  }

  seleccionar() {}

  
  sweet(){
    this.isButtonNOTVisible = true
    Swal.fire({
      allowOutsideClick: false,
      title: '¿Podrías decirnos el porque?',
      input: 'text',
      confirmButtonText: 'Enviar',
      confirmButtonColor: '#FFA726',
    }).then((result) => {
      if (result.value) {
        this.mensaje = result.value;
      }
    })
  }
  
}
