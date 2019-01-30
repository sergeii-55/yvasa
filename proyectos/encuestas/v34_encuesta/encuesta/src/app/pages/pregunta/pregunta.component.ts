import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InformacionService } from 'src/app/services/informacion.service';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { browser } from 'protractor';



@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.css']
})
export class PreguntaComponent implements OnInit {
  id = 'ID';
  region = 'Sucursal';
  asesor_nombre = 'Nombre del asesor';
  cliente_nombre = 'Nombre del cliente';
  cliente_correo = 'Correo electrónico';
  fecha = "FECHA";
  existo = true;
  disable = true;

  public formularios = [];
  public currentStatus = 1;
  public newFormularioForm = new FormGroup({
    id: new FormControl('', Validators.required),
    region: new FormControl('', Validators.required),
    asesor_nombre: new FormControl('', Validators.required),
    cliente_nombre: new FormControl ('', Validators.required),
    cliente_correo: new FormControl('', Validators.required),
    fecha: new FormControl('', Validators.required),
  });

  constructor(private router: Router,
              public informacionService: InformacionService,
              public firestoreService: FirestoreService)
               {
                      this.newFormularioForm.setValue({
                        id: '',
                        region: '',
                        asesor_nombre: '',
                        cliente_nombre: '',
                        cliente_correo: '',
                        fecha:'',
                      });
               }
 ngOnInit() {
 }

public newFormulario ( form )
{
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();
  var time = today.toLocaleTimeString();
  var fechal = mm + '-' + dd + '-' + yyyy + '>'+ time;

   const data = 
   {  
    id: form.id,
    region: form.region,
    asesor_nombre: form.asesor_nombre,
    cliente_nombre: form.cliente_nombre,
    cliente_correo: form.cliente_correo,
    fecha: fechal,
    }; 
        this.firestoreService.createFormulario(data).then( ( ) => {
                console.log('Documento creado exitosamente');
                this.newFormularioForm.setValue({
                  id: '',
                  region: '',
                  asesor_nombre: '',
                  cliente_nombre: '',
                  cliente_correo: '',
                  fecha:'',
                });
            },   
                  (error) => {
                    console.error(error);
                  });
    this.router.navigateByUrl('/pregunta1'); 
}
  comenzar() {
 this.existo = false;
              }
  cancelar() {
    setTimeout(() => window.location.reload(),500);
              }
              
}