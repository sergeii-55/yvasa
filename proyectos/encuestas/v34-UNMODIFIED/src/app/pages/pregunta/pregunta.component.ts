import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InformacionService } from 'src/app/services/informacion.service';
import { FormularioInterface } from '../../interfaces/formulario.interface';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';



@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.css']
})
export class PreguntaComponent implements OnInit {

  region = 'Sucursal';
  asesor_nombre = 'Nombre del asesor';
  cliente_nombre = 'Nombre del cliente';
  cliente_correo = 'Correo electrónico';
  existo = true;
  disable = true;

  public formularios = [];
  public documentId = null;
  public currentStatus = 1;
  public newFormularioForm = new FormGroup({
    region: new FormControl('', Validators.required),
    asesor_nombre: new FormControl('', Validators.required),
    cliente_nombre: new FormControl ('', Validators.required),
    cliente_correo: new FormControl('', Validators.required),
    id: new FormControl('', Validators.required)
  });

  constructor(private router: Router,
              public informacionService: InformacionService,
              public firestoreService: FirestoreService) {
    this.newFormularioForm.setValue({
      id: '',
      region: '',
      asesor_nombre: '',
      cliente_nombre: '',
      cliente_correo: ''
    });

 }

 ngOnInit() {
 
 }

public newFormulario ( form, documentId = this.documentId ) {
   const data = {  // donde dice const antes habia un let
    region: form.region,
    asesor_nombre: form.asesor_nombre,
    cliente_nombre: form.cliente_nombre,
    cliente_correo: form.cliente_correo
    }; // agregue punto y coma. No lo tenia

    this.firestoreService.createFormulario(data).then( ( ) => {
        console.log('Documento creado exitósamente');
        this.newFormularioForm.setValue({
          region: '',
          asesor_nombre: '',
          cliente_nombre: '',
          cliente_correo: '',
          id: ''
        });
      }, (error) => {
        console.error(error);
    });
    this.router.navigateByUrl('/pregunta1');
  }


  comenzar() {

 this.existo = false;

              }

  cancelar() {

    // Guardar en base de datos y pasar a la siguiente pagina

    this.router.navigateByUrl('/');
    window.location.reload();
  }
}
