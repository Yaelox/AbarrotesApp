import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database'; // Correcta importación
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private basePath = '/categorias';

  constructor(private db: AngularFireDatabase) {} // Usamos AngularFireDatabase aquí

  // Obtener todas las categorías
  getCategorias(): Observable<any[]> {
    return this.db.list(this.basePath).valueChanges();
  }

  // Eliminar una categoría
  deleteCategoria(id: string): Promise<void> {
    return this.db.object(`${this.basePath}/${id}`).remove();
  }

// Crear una nueva categoría con manejo de errores
createCategoria(categoria: any): Promise<any> {
  return this.db.list(this.basePath).push(categoria)
    .catch((error) => {
      console.error('Error al crear la categoría: ', error);
      throw error; // Lanza el error para que lo maneje el componente o la llamada
    });
}

// Actualizar una categoría con manejo de errores
updateCategoria(id: string, categoria: any): Promise<void> {
  return this.db.object(`${this.basePath}/${id}`).update(categoria)
    .catch((error) => {
      console.error('Error al actualizar la categoría: ', error);
      throw error;
    });
}
}
