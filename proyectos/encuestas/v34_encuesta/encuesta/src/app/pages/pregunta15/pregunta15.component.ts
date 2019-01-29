import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pregunta15',
  templateUrl: './pregunta15.component.html',
  styleUrls: ['./pregunta15.component.css']
})

export class Pregunta15Component{
  constructor(private router: Router) {
     this.router.navigateByUrl('/pregunta15.component.html');
   }
}
