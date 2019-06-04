import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';


@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})


export class ReporteComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone,
   
  ) { }

  ngOnInit() {
    var db = firebase.firestore();

    db.collection('checadores').get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        console.log(doc.id);
      });
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });

  }

  
  }

  