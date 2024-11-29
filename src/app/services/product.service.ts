import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Interfaz para representar un producto
export interface Producto {
  id: string; // ID único generado por Firestore (opcional para creación)
  Nombre: string;
  Precio: number;
  Stock: number;
  Categoria: string;
  Descripcion: string;  
  proveedor: string;
  Fechadeagregado?: any; // Fecha opcional al agregar
  Fechadeactualizacion?: any; // Fecha opcional al actualizar
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private collectionName = 'Productos'; // Nombre de la colección en Firestore

  constructor(private firestore: AngularFirestore) {}

  getProducts(): Observable<Producto[]> {
    return this.firestore
      .collection<Producto>(this.collectionName)
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as Producto; // Los datos del producto
            const id = a.payload.doc.id; // El id del documento
            console.log('Producto obtenido:', { ...data, id }); // Log de los datos
            return { ...data, id }; // Agregar id de manera segura sin sobrescribir
          })
        )
      );
  }
  
  getProductById(id: string): Observable<Producto | undefined> {
    return this.firestore
      .collection<Producto>(this.collectionName)
      .doc(id)
      .snapshotChanges() // Usamos snapshotChanges para obtener el id
      .pipe(
        map((doc) => {
          const data = doc.payload.data() as Producto; // Los datos del producto
          if (data) {
            // Asegurarnos de no sobrescribir la propiedad 'id' si ya existe
            return { ...data, id }; // Asignamos el id al objeto sin sobrescribir
          }
          return undefined;
        })
      );
  }
  
  addProducto(newProducto: Producto): Promise<void> {
    // Validar que los campos obligatorios estén completos
    if (!newProducto.Nombre || !newProducto.Descripcion || !newProducto.Categoria || !newProducto.Precio || !newProducto.Stock || !newProducto.proveedor) {
      return Promise.reject(new Error('Todos los campos son obligatorios para agregar un producto.'));
    }
  
    // Generar un ID único para el nuevo producto
    const id = this.firestore.createId();
  
    // Preparar el objeto del producto con la fecha de agregado
    const productoData = {
      ...newProducto, // Copiar los campos del objeto `newProducto`
      Fechadeagregado: new Date(), // Agregar la fecha de creación
    };
  
    // Intentar guardar el producto en la colección de Firestore
    return this.firestore
      .collection(this.collectionName)
      .doc(id) // Usar el ID generado
      .set(productoData) // Guardar los datos del producto
      .then(() => {
        console.log('Producto agregado correctamente:', productoData);
      })
      .catch((error) => {
        console.error('Error al agregar el producto:', error);
        throw new Error('Hubo un problema al guardar el producto. Por favor, inténtalo nuevamente.');
      });
  }

  updateProducto(id: string, updatedProducto: Partial<Producto>): Promise<void> {
    return this.firestore
      .collection(this.collectionName)
      .doc(id)
      .update({
        ...updatedProducto,
        Fechadeactualizacion: new Date(), // Agregar timestamp de actualización
      })
      .then(() => console.log('Producto actualizado correctamente'))
      .catch((error) => {
        console.error('Error al actualizar el producto:', error);
        throw error;
      });
  }

  deleteProducto(id: string): Promise<void> {
    if (!id) {
      console.error('ID no proporcionado');
      return Promise.reject('ID no proporcionado');
    }
  
    return this.firestore
      .collection(this.collectionName)
      .doc(id)
      .delete()
      .then(() => console.log('Producto eliminado correctamente'))
      .catch((error) => {
        console.error('Error al eliminar el producto:', error);
        throw error;
      });
  }
}
