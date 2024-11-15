import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class CategoriaService {

  constructor(private firestore: AngularFirestore) { }

   // Método para obtener los productos
   getCategorias(): Observable<any[]> {
    return this.firestore.collection('Categorias').valueChanges();
  }
}