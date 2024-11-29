import { Component, OnInit } from '@angular/core';
import { ProductService, Producto } from '../../services/product.service';
import { NavController } from '@ionic/angular'; 

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.page.html',
  styleUrls: ['./inventario.page.scss'],
})
export class InventarioPage implements OnInit {
  productos: Producto[] = []; // Inicializar como un array vacío

  constructor(private productService: ProductService,
    private navCtrl: NavController) {}

  ngOnInit() {
    this.loadProductos();
  }

  loadProductos() {
    this.productService.getProducts().subscribe((productos) => {
      this.productos = productos;
    });
  }

  editProducto(producto: Producto) {
    console.log('Editar producto:', producto);
    // Implementar lógica para editar producto
  }

  deleteProducto(id: string) {
    this.productService
      .deleteProducto(id)
      .then(() => {
        console.log('Producto eliminado');
      })
      .catch((error) => {
        console.error('Error al eliminar producto:', error);
      });
  }

  goToHome() {
    console.log('Ir a la página principal');
    // Navegar a la página principal (inicio) y resetear el historial
    this.navCtrl.navigateRoot('/home');
  }
}
