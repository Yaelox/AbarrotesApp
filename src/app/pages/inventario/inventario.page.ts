import { Component, OnInit } from '@angular/core';
import { ProductService, Producto } from '../../services/product.service';
import { NavController, ModalController } from '@ionic/angular';
import { EditProductModalComponent } from '../../components/edit-product-modal/edit-product-modal.component'; // Importa el componente modal

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.page.html',
  styleUrls: ['./inventario.page.scss'],
})
export class InventarioPage implements OnInit {
  productos: Producto[] = [];
  productoEditando: Producto | undefined;

  constructor(
    private productService: ProductService,
    private navCtrl: NavController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.loadProductos();
  }

  loadProductos() {
    this.productService.getProducts().subscribe((productos) => {
      this.productos = productos;
    });
  }

  async editarProducto(id: string): Promise<void> {
    // Busca el producto a editar en la lista
    const productoAEditar = this.productos.find(prod => prod.id === id);
    
    if (productoAEditar) {
      this.productoEditando = productoAEditar;
      
      // Crea el modal y pasa el producto al componente del modal
      const modal = await this.modalCtrl.create({
        component: EditProductModalComponent,
        componentProps: { producto: this.productoEditando } // Pasamos el producto al modal
      });

      modal.onDidDismiss().then((result) => {
        if (result.data) {
          // Si se han realizado cambios, actualizamos el producto
          const updatedProducto = result.data;
          this.productService.updateProducto(updatedProducto.id, updatedProducto).then(() => {
            console.log('Producto actualizado correctamente');
            this.loadProductos(); // Recargamos la lista de productos
          }).catch(error => {
            console.error('Error al actualizar el producto', error);
          });
        }
      });

      await modal.present(); // Presentamos el modal
    }
  }

  deleteProducto(id: string) {
    // Lógica para eliminar producto
    this.productService.deleteProducto(id).then(() => {
      this.loadProductos(); // Recargamos la lista de productos después de eliminar
    });
  }

  goToHome() {
    this.navCtrl.navigateRoot('/home'); // Navega a la página de inicio
  }
}
