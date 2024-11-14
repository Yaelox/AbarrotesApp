import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categoria',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriaPage implements OnInit {
  categorias: any[] = []; // Almacena las categorías
  newCategoriaNombre: string = ''; // Nombre de la nueva categoría
  newCategoriaDescripcion: string = ''; // Descripción de la nueva categoría

  constructor(private categoriaService: CategoriaService, private router: Router) {}

  ngOnInit() {
    this.loadCategorias(); // Cargar las categorías al iniciar la página
  }

  // Método para cargar las categorías
  loadCategorias() {
    this.categoriaService.getCategorias().subscribe(
      (data) => {
        // Verifica que las categorías tienen un 'id' para cada una
        this.categorias = data.map(categoria => ({
          ...categoria, 
          id: categoria.key // Si estás usando Firebase, la 'key' es el identificador único
        }));
      },
      (error) => {
        console.error('Error al cargar las categorías', error);
      }
    );
  }

  // Método para agregar una categoría
  addCategoria() {
    const nuevaCategoria = {
      nombre: this.newCategoriaNombre,
      descripcion: this.newCategoriaDescripcion,
    };

    this.categoriaService.createCategoria(nuevaCategoria)
      .then(() => {
        this.loadCategorias(); // Recargar la lista después de agregar
        this.newCategoriaNombre = ''; // Limpiar el campo de nombre
        this.newCategoriaDescripcion = ''; // Limpiar el campo de descripción
      })
      .catch((error) => {
        console.error('Error al agregar la categoría', error);
      });
  }

  // Método para eliminar una categoría
  eliminarCategoria(categoriaId: string) {
    this.categoriaService.deleteCategoria(categoriaId).then(() => {
      this.loadCategorias(); // Recargar la lista después de eliminar
    }).catch((error) => {
      console.error('Error al eliminar la categoría', error);
    });
  }

  // Método para editar una categoría
  editarCategoria(categoriaId: string) {
    this.router.navigate(['/edit-categoria', categoriaId]); // Navegar a la página de edición
  }
}
