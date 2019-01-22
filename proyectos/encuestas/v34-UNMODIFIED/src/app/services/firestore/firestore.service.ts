import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor( private firestore: AngularFirestore ) { }

  // crear un nuevo registro
  // se elimino esto despues de data: { region: string, asesor_nombre: string , cliente_nombre: string , cliente_correo: string }
  public createFormulario ( data: any ) {
        return this.firestore.collection('formularios').add(data);
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
    return this.firestore.collection('pregunta1').add(data);
}

public createPregunta2( data: any ) {
  return this.firestore.collection('pregunta2').add(data);
}

public createPregunta3( data: any ) {
  return this.firestore.collection('pregunta3').add(data);
}

public createPregunta4( data: any ) {
return this.firestore.collection('pregunta4').add(data);
}

public createPregunta5( data: any ) {
  return this.firestore.collection('pregunta5').add(data);
}

public createPregunta6( data: any ) {
  return this.firestore.collection('pregunta6').add(data);
}

public createPregunta7( data: any ) {
  return this.firestore.collection('pregunta7').add(data);
}

public createPregunta8( data: any ) {
  return this.firestore.collection('pregunta8').add(data);
}

public createPregunta9( data: any ) {
  return this.firestore.collection('pregunta9').add(data);
}

public createPregunta10( data: any ) {
  return this.firestore.collection('pregunta10').add(data);
}

public createPregunta11( data: any ) {
  return this.firestore.collection('pregunta11').add(data);
}

public createPregunta12( data: any ) {
  return this.firestore.collection('pregunta12').add(data);
}

public createPregunta13( data: any ) {
  return this.firestore.collection('pregunta13').add(data);
}

public createPregunta14( data: any ) {
  return this.firestore.collection('pregunta14').add(data);
}

}
