import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-edit-categoria',
  templateUrl: './edit-categoria.page.html',
  styleUrls: ['./edit-categoria.page.scss'],
})
export class EditCategoriaPage implements OnInit {
  
  categoriaId: string = '';
  categoriaNombre: string = '';
  categoriaDescripcion: string = '';

  constructor(
    private activatedRoute: ActivatedRoute, 
    private categoriaService: CategoriaService,
    private router: Router
  ) {}

  ngOnInit() {
    this.categoriaId = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.loadCategoria();
  }

  loadCategoria() {
    console.log("ID de categoría:", this.categoriaId);
  
    if (!this.categoriaId) {
      console.error("El ID de la categoría es inválido o no está definido.");
      return;
    }
  
    this.categoriaService.getCategoria(this.categoriaId).then(snapshot => {
      if (snapshot.exists()) {
        const categoria = snapshot.val();
        this.categoriaNombre = categoria.nombre;
        this.categoriaDescripcion = categoria.descripcion;
      } else {
        console.log("No existe la categoría");
      }
    }).catch(error => {
      console.error("Error al obtener la categoría:", error);
    });
  }

  updateCategoria() {
    if (this.categoriaNombre.trim() && this.categoriaDescripcion.trim()) {
      const updatedCategoria = {
        nombre: this.categoriaNombre,
        descripcion: this.categoriaDescripcion
      };
      this.categoriaService.updateCategoria(this.categoriaId, updatedCategoria).then(() => {
        this.router.navigate(['/categorias']);
      });
    }
  }
}
