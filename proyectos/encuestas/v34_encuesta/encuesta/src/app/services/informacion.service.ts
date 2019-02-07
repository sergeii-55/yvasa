import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormularioInterface } from '../interfaces/formulario.interface';
import { ImagenInterface } from '../interfaces/imagen.interface';
import { PreguntaInterface } from '../interfaces/pregunta.interface';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class InformaciónService {

  listo = false;
  formularios: FormularioInterface = {};
  imagenes: ImagenInterface = {};
  preguntas: PreguntaInterface = {};

  constructor( private http: HttpClient ) { 

    this.cargarFormularios();
    this.cargarImagenes();
    this.cargarPreguntas();
    this.listo = true;

  }
//comentario BRANCH
  cargarFormularios() {
    this.http.get('https://encuestas-1b232.firebaseio.com/formulario.json')
             .subscribe( ( resp: FormularioInterface ) => {
              this.formularios = resp;
              console.log(this.formularios);
             });

  }

  cargarImagenes() {

    this.http.get('https://encuestas-1b232.firebaseio.com/img.json')
             .subscribe( ( res: ImagenInterface ) => {
              this.imagenes = res;
              console.log(this.imagenes);
             });

  }

  cargarPreguntas() {

    this.http.get('https://encuestas-1b232.firebaseio.com/preguntas.json')
             .subscribe( ( respt: PreguntaInterface ) => {
              this.preguntas = respt;
              console.log(this.preguntas);

             });
  }
}
