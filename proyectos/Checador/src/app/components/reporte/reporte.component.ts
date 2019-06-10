import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import 'firebase/database';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})


export class ReporteComponent implements OnInit {

  constructor(
    public afs: AngularFirestore,
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone,
   
  ) { }

  ngOnInit() {
 

  }








}

//   var db = firebase.firestore();

//   db.collection('checadores').get()
//  .then((snapshot) => {
//    snapshot.forEach((doc) => {
//      console.log(doc.id);
//    });
//  })
//  .catch((err) => {
//    console.log('Error getting documents', err);
//  });

// db.collection(year)
// .doc(mesActual)
// .collection(semana)
// .doc(user.displayName)
// .collection(diaMo)
// .doc('Entrada').get()
// .then((doc) => {
//     console.log(doc.data());
// })
// .catch((err) => {
//   console.log('Error getting documents', err);
// });