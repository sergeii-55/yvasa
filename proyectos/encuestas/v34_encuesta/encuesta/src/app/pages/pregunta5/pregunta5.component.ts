import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { InformaciónService } from 'src/app/services/informacion.service';

@Component({
  selector: 'app-pregunta5',
  templateUrl: './pregunta5.component.html',
  styleUrls: ['./pregunta5.component.css']
})
export class Pregunta5Component implements OnInit {

  lb_feliz = 'Me ayudó';
  lb_triste = 'Solo vendió';
  selected = "Me ayudó";
 
  
    public pregunta5 = [];
    public documentId = null;
    public currentStatus = 1;
    public newPregunta5Form = new FormGroup({
      pregunta05: new FormControl( '' , Validators.required ),
      id: new FormControl( '' )
    });

  constructor(private router: Router,
              public firestoreService: FirestoreService,
              public informacionService: InformaciónService) {
    this.newPregunta5Form.setValue({
      id: '' ,
      pregunta05: ''
    });
}

  ngOnInit() {}

public newPregunta5 ( form ) {
    const data = {
      pregunta05: form.pregunta05
   };
this.firestoreService.createPregunta5(data) 
{
  console.log('Información de pregunta 5 guardada con éxito');
  this.newPregunta5Form.setValue({
    pregunta05: '' ,
    id: '' 
  });
}; (error) => {
  console.error(error);
};
this.router.navigateByUrl('/pregunta6');
}

  seleccionar() {
  }
}
