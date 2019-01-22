import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-variables',
  templateUrl: './variables.component.html',
  styleUrls: ['./variables.component.css']
})
export class VariablesComponent implements OnInit {


  constructor(private router: Router) {

  }

  comenzar() {

    this.router.navigateByUrl('/pregunta');


  }

  ngOnInit() {

  }

}
