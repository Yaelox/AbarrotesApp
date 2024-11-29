import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular'; // Asegúrate de importar ModalController
import { ProductService } from '../../services/product.service'; // Ajusta la ruta de acuerdo a tu estructura
import { Producto } from '../../services/product.service'; // Ajusta la ruta de acuerdo a tu estructura
import { CategoriaService } from '../../services/categoria.service';
import { ProveedoresService } from '../../services/proveedores.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-product-modal',
  templateUrl: './edit-product-modal.component.html',
})
export class EditProductModalComponent implements OnInit {
  @Input() producto: Producto | undefined;
  categorias: Observable<any[]>  | undefined;; // Observable para categorias
  proveedores: Observable<any[]>  | undefined;; // Observable para proveedores

  constructor(
    private modalCtrl: ModalController,
    private productService: ProductService, // Inyecta el servicio de productos
    private categoriasService: CategoriaService, // Inyecta el servicio de categorías
    private proveedorService: ProveedoresService, // Inyecta el servicio de proveedores
  ) {}

  ngOnInit() {
    // Aseguramos que el producto no sea undefined y tiene las propiedades requeridas
    if (!this.producto) {
      this.producto = {
        id: '', // Proporciona un valor predeterminado para id
        Nombre: '',
        Precio: 0,
        Stock: 0,
        Categoria: '',
        proveedor: '',
        Descripcion: '', // Agregar Descripcion con un valor predeterminado
      };
    }

    // Carga las categorías y proveedores
    this.categorias = this.categoriasService.getCategorias();
    this.proveedores = this.proveedorService.getProveedores();
  }

  // Cerrar modal
  closeModal() {
    this.modalCtrl.dismiss(); // Cierra el modal
  }

  saveChanges() {
    if (this.producto && this.producto.proveedor) {
      this.modalCtrl.dismiss(this.producto); // Envía el producto actualizado, incluyendo el proveedor
    }
  }
}
