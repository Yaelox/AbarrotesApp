import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

export interface Producto {
  id?: string; // Se incluye porque Firestore genera IDs únicos
  Nombre: string;
  Precio: number;
  Stock: number;
  Categoria: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private collectionName = 'Productos';  // Nombre de la colección en Firestore

  constructor(private firestore: AngularFirestore) {}

  // Método para obtener los productos
  getProducts(): Observable<any[]> {
    return this.firestore.collection(this.collectionName).valueChanges();
  }

  // Método para actualizar un producto
  updateProducto(id: string, updatedProducto: Producto): Promise<void> {
    return this.firestore
      .collection(this.collectionName)
      .doc(id)
      .update(updatedProducto)
      .then(() => console.log('Producto actualizado correctamente'))
      .catch((error) => {
        console.error('Error al actualizar el producto: ', error);
        throw error;
      });
  }

  // Método para eliminar un producto
  deleteProducto(id: string): Promise<void> {
    return this.firestore
      .collection(this.collectionName)
      .doc(id)
      .delete()
      .then(() => console.log('Producto eliminado correctamente'))
      .catch((error) => {
        console.error('Error al eliminar el producto: ', error);
        throw error;
      });
  }
}
