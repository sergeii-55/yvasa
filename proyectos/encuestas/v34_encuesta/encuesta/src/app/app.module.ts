import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { Pregunta1Component } from './pages/pregunta1/pregunta1.component';
import { Pregunta2Component } from './pages/pregunta2/pregunta2.component';
import { Pregunta3Component } from './pages/pregunta3/pregunta3.component';
import { Pregunta4Component } from './pages/pregunta4/pregunta4.component';
import { Pregunta5Component } from './pages/pregunta5/pregunta5.component';
import { Pregunta6Component } from './pages/pregunta6/pregunta6.component';
import { Pregunta7Component } from './pages/pregunta7/pregunta7.component';
import { Pregunta8Component } from './pages/pregunta8/pregunta8.component';
import { Pregunta9Component } from './pages/pregunta9/pregunta9.component';
import { Pregunta10Component } from './pages/pregunta10/pregunta10.component';
import { Pregunta11Component } from './pages/pregunta11/pregunta11.component';
import { VariablesComponent } from './components/variables/variables.component';
import { PreguntaComponent } from './pages/pregunta/pregunta.component';
import { AngularFirestore } from 'angularfire2/firestore';
import { FirestoreService } from './services/firestore/firestore.service';
import { InformacionService } from 'src/app/services/informacion.service';
import { DespedidaService } from './services/despedida.service';
import { Pregunta12Component } from './pages/pregunta12/pregunta12.component';
import { Pregunta13Component } from './pages/pregunta13/pregunta13.component';
import { Pregunta14Component } from './pages/pregunta14/pregunta14.component';
import { Pregunta15Component } from './pages/pregunta15/pregunta15.component';

@NgModule({
  declarations: [
    AppComponent,
    Pregunta1Component,
    Pregunta2Component,
    Pregunta3Component,
    Pregunta4Component,
    Pregunta5Component,
    Pregunta6Component,
    Pregunta7Component,
    Pregunta8Component,
    Pregunta9Component,
    Pregunta10Component,
    Pregunta11Component,
    VariablesComponent,
    PreguntaComponent,
    Pregunta12Component,
    Pregunta13Component,
    Pregunta14Component,
    Pregunta15Component,
  ],
  imports: [
    BrowserModule, RouterModule.forRoot([
      { path: 'pregunta' , component: PreguntaComponent },
      { path: 'pregunta1' , component: Pregunta1Component },
      { path: 'pregunta2' , component: Pregunta2Component },
      { path: 'pregunta3' , component: Pregunta3Component },
      { path: 'pregunta4' , component: Pregunta4Component },
      { path: 'pregunta5' , component: Pregunta5Component },
      { path: 'pregunta6' , component: Pregunta6Component },
      { path: 'pregunta7' , component: Pregunta7Component },
      { path: 'pregunta8' , component: Pregunta8Component },
      { path: 'pregunta9' , component: Pregunta9Component },
      { path: 'pregunta10' , component: Pregunta10Component },
      { path: 'pregunta11' , component: Pregunta11Component },
      { path: 'pregunta12' , component: Pregunta12Component },
      { path: 'pregunta13' , component: Pregunta13Component },
      { path: 'pregunta14' , component: Pregunta14Component },
      { path: 'pregunta15' , component: Pregunta15Component },
    ]),
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule, ReactiveFormsModule, FormsModule
  ],
  providers: [  AngularFirestore, FirestoreService, InformacionService , DespedidaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
