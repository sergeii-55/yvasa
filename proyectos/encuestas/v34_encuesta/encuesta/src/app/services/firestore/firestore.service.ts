import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, fromDocRef, DocumentSnapshot } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';

@Injectable({
  providedIn: 'root'
})

export class FirestoreService {

  constructor( private firestore: AngularFirestore ) { }

  idol:string;
  
  // crear un nuevo registro
  public createFormulario ( data ) {
        return this.firestore.collection('formularios').add(data).then
        (ref => {
         data.id = ref.id;
         this.firestore.collection('formularios').doc( ref.id ).update(data);
         this.idol = ref.id;
        });
        
  }
  // obtener un registro
  public getFormulario ( documentId: string ) {
return this.firestore.collection('formularios').doc(documentId).snapshotChanges();
  }
  // Obtener todos los registros
  public getFormularios () {
    return this.firestore.collection('formularios').snapshotChanges();
  }
  // Actualizar registro
  public updateFormulario ( documentId: string, data: any ) {
    return this.firestore.collection('formularios').doc(documentId).set(data);
  }
  // eliminar registro
  public deleteFormulario(documentId: string) {
    return this.firestore.collection('formularios').doc(documentId).delete();
  }
  // Metodos guardado de preguntas en bd
  public createPregunta1 ( data: any ) {
    this.firestore.collection('formularios').doc( this.idol ).update(data);
}

public createPregunta2( data: any ) {
  this.firestore.collection('formularios').doc( this.idol ).update(data);
}

public createPregunta3( data: any ) {
  this.firestore.collection('formularios').doc( this.idol ).update(data);
}

public createPregunta4( data: any ) {
  this.firestore.collection('formularios').doc( this.idol ).update(data);
}

public createPregunta5( data: any ) {
  this.firestore.collection('formularios').doc( this.idol ).update(data);
}

public createPregunta6( data: any ) {
  this.firestore.collection('formularios').doc( this.idol ).update(data);
}

public createPregunta7( data: any ) {
  this.firestore.collection('formularios').doc( this.idol ).update(data);
}

public createPregunta8( data: any ) {
  this.firestore.collection('formularios').doc( this.idol ).update(data);
}

public createPregunta9( data: any ) {
  this.firestore.collection('formularios').doc( this.idol ).update(data);
}

public createPregunta10( data: any ) {
  this.firestore.collection('formularios').doc( this.idol ).update(data);
}

public createPregunta11( data: any ) {
  this.firestore.collection('formularios').doc( this.idol ).update(data);
}

public createPregunta12( data: any ) {
  this.firestore.collection('formularios').doc( this.idol ).update(data);
}

public createPregunta13( data: any ) {
  this.firestore.collection('formularios').doc( this.idol ).update(data);
}

public createPregunta14( data: any ) {
  this.firestore.collection('formularios').doc( this.idol ).update(data);

}

}
