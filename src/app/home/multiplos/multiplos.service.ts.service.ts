import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// importamos lo que usaremos para firesbase en este caso firestor, collection, collectionData y addDoc
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { addDoc } from 'firebase/firestore';
// importamos interfaz
import { resultadoDTO } from './dto/multiplo.dto';

@Injectable({
  providedIn: 'root',
})
export class MultiplosService {
  // Agregamos firestore de tipo Firestore
  constructor(private firestore: Firestore) {}
  // metodo para agregar el documento a la coleciones de firestore
  saveResultados(multiplos: resultadoDTO) {
    // instanciamos la colección multiplos
    const multiplosRef = collection(this.firestore, 'multiplos');
    // agregamos un nuevo documento y retornamos la respuesta
    return addDoc(multiplosRef, multiplos);
  }

  // metodo para traer todos los documentos de la colección
  getResultados(peticion: number): Observable<resultadoDTO[]> {
    // instanciamos la colección multiplos
    const multiplosRef = collection(this.firestore, 'multiplos');
    // recuperamos los documentos de la coleccón multiplos y la retornamos
    return collectionData(multiplosRef) as Observable<resultadoDTO[]>;
  }
}
