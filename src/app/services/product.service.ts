import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

export interface Producto {
  id: string;
  Categoria: string;
  Descripcion: string;
  Fechadeagregado: any;
  Nombre: string;
  Precio: number;
  Stock: number;
  proveedor: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private collectionName = 'Productos';

  constructor(private firestore: AngularFirestore) {}

  // Obtener productos
  getProducts(): Observable<Producto[]> {
    return this.firestore.collection<Producto>(this.collectionName).valueChanges({ idField: 'id' });
  }

  // Agregar producto
  addProduct(producto: Producto): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.collection(this.collectionName).doc(id).set(producto);
  }

  // Actualizar producto
  updateProduct(id: string, producto: Producto): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(id).update(producto);
  }

  // Eliminar producto
  deleteProduct(id: string): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(id).delete();
  }
}
