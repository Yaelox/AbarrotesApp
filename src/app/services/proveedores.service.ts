import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ProveedoresService {

  constructor(private firestore: AngularFirestore) { }

   // Método para obtener los productos
   getProveedores(): Observable<any[]> {
    return this.firestore.collection('Proveedores').valueChanges();
  }
}