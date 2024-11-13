import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service'; // Asegúrate de que esta ruta sea correcta
import { Router } from '@angular/router';

@Component({
  selector: 'app-categoria',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriaPage implements OnInit {
  categorias: any[] = [];

  constructor(
    private categoriaService: CategoriaService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCategorias();
  }

  loadCategorias() {
    this.categoriaService.getCategorias().subscribe(
      (data) => {
        this.categorias = data;
      },
      (error) => {
        console.error('Error al cargar las categorías', error);
      }
    );
  }

  editarCategoria(categoriaId: string) {
    this.router.navigate(['/edit-categoria', categoriaId]);
  }

  eliminarCategoria(categoriaId: string) {
    this.categoriaService.deleteCategoria(categoriaId).then(() => {
      this.loadCategorias(); // Recargar la lista después de eliminar
    }).catch(error => {
      console.error('Error al eliminar la categoría', error);
    });
  }
}
