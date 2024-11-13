import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private firestore: AngularFirestore) { }

  // Método para obtener los productos
  getProducts(): Observable<any[]> {
    return this.firestore.collection('Productos').valueChanges();
  }
}
