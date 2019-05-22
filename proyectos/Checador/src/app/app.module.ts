import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Reactive Form
import { ReactiveFormsModule } from "@angular/forms";

// App routing modules
import { AppRoutingModule } from './shared/routing/app-routing.module';

// App Components
import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { MenuComponent } from './components/menu/menu.component';
import { ManagerComponent } from './components/manager/manager.component';
import { ReporteComponent } from './components/reporte/reporte.component';

// Firebase services + enviroment module
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { FirestoreSettingsToken} from '@angular/fire/firestore';

// Auth service
import { AuthService } from "./shared/services/auth.service";
import { MailUserComponent } from './components/mail-user/mail-user.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ManagerComponent,
    ReporteComponent,
    SignInComponent,
    MailUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFirestoreModule.enablePersistence(),
    ReactiveFormsModule
  ],
  providers: [AuthService, AngularFirestore, { provide: FirestoreSettingsToken, useValue: {} }],
  bootstrap: [AppComponent]
})
export class AppModule { }
