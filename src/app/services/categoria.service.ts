import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private basePath: string = '/categorias';

  constructor(private db: AngularFireDatabase) {}

  getCategorias(): Observable<any[]> {
    return this.db.list(this.basePath).valueChanges();
  }

  getCategoria(id: string): Promise<any> {
    return this.db.object(`${this.basePath}/${id}`).query.get();
  }

  deleteCategoria(id: string): Promise<void> {
    return this.db.object(`${this.basePath}/${id}`).remove()
      .then(() => console.log(`Categoría con ID ${id} eliminada`))
      .catch(error => {
        console.error('Error al eliminar la categoría:', error);
        throw error;
      });
  }

  createCategoria(categoria: any): Promise<void> {
    return this.db.list(this.basePath).push(categoria)
      .then(() => console.log('Categoría creada exitosamente'))
      .catch(error => {
        console.error('Error al crear la categoría:', error);
        throw error;
      });
  }

  updateCategoria(id: string, categoria: any): Promise<void> {
    return this.db.object(`${this.basePath}/${id}`).update(categoria)
      .then(() => console.log(`Categoría con ID ${id} actualizada`))
      .catch(error => {
        console.error('Error al actualizar la categoría:', error);
        throw error;
      });
  }
}
