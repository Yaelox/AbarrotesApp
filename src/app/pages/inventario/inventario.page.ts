import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { NavController, ModalController, AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CategoriaService } from '../../services/categoria.service';  // Verifica que la ruta del archivo sea correcta
import { ProveedoresService } from '../../services/proveedores.service'; // Asegúrate de importar el servicio de proveedores

export interface Producto {
  id: string;
  Nombre: string;
  Precio: number;
  Stock: number;
  Categoria: string;
  Descripcion: string;
  Fechadeagregado: any;
  proveedor: string;
}

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.page.html',
  styleUrls: ['./inventario.page.scss'],
})
export class InventarioPage implements OnInit {
  productos: Producto[] = [];
  categorias: string[] = [];
  proveedores: string[] = [];

  constructor(
    private productService: ProductService,
    private categoriaService: CategoriaService, // Inyectar el servicio de categorías
    private proveedoresService: ProveedoresService, // Inyectar el servicio de proveedores
    private navCtrl: NavController,
    private router: Router,
    private firestore: AngularFirestore,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    // Obtener productos
    this.loadProductos(); // Cargar productos al inicializar el componente

    // Obtener categorías y proveedores
    this.categoriaService.getCategorias().subscribe((data) => {
      this.categorias = data;
    });

    this.proveedoresService.getProveedores().subscribe((data) => {
      this.proveedores = data;
    });
  }

  loadProductos() {
    this.productService.getProducts().subscribe((data) => {
      this.productos = data; // Recarga los productos en la lista
    });
  }

  goToHome() {
    this.navCtrl.navigateRoot('/home');
  }

  async editProducto(producto: Producto) {
    const alert = await this.alertController.create({
      header: 'Editar Producto',
      inputs: [
        {
          name: 'Nombre',
          type: 'text',
          placeholder: 'Nombre del producto',
          value: producto.Nombre,
        },
        {
          name: 'Precio',
          type: 'number',
          placeholder: 'Precio',
          value: producto.Precio,
        },
        {
          name: 'Stock',
          type: 'number',
          placeholder: 'Stock',
          value: producto.Stock,
        },
        {
          name: 'Categoria',
          type: 'text',
          placeholder: 'Categoría',
          value: producto.Categoria,
        },
        {
          name: 'Descripcion',
          type: 'text',
          placeholder: 'Descripción',
          value: producto.Descripcion,
        },
        {
          name: 'proveedor',
          type: 'text',
          placeholder: 'Proveedor',
          value: producto.proveedor,
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Guardar',
          handler: (data) => {
            if (this.isFormValid(data)) {
              const updatedProducto: Producto = {
                ...producto,
                Nombre: data.Nombre,
                Precio: +data.Precio,
                Stock: +data.Stock,
                Categoria: data.Categoria,
                Descripcion: data.Descripcion,
                proveedor: data.proveedor,
              };
              if (producto.id) {
                this.productService.updateProducto(producto.id, updatedProducto).then(() => {
                  this.showToast('Producto actualizado exitosamente');
                  this.loadProductos(); // Recarga los productos después de la actualización
                }).catch((err) => {
                  console.error(err);
                  this.showToast('Error al actualizar el producto');
                });
              }
            } else {
              this.showToast('Por favor, complete todos los campos');
            }
          },
        },
      ],
    });
  
    await alert.present();
  }
  
  // Validación de formulario
  isFormValid(data: any): boolean {
    return data.Nombre && data.Precio > 0 && data.Stock >= 0 && data.Categoria && data.Descripcion && data.proveedor;
  }

  //Eliminar
  deleteProducto(id: string) {
    if (id) {
      this.productService.deleteProducto(id).then(() => {
        this.showToast('Producto eliminado exitosamente');
        this.loadProductos(); // Recarga los productos después de la eliminación
      }).catch((err) => {
        console.error(err);
        this.showToast('Error al eliminar el producto');
      });
    } else {
      this.showToast('ID de producto no válido');
    }
  }

  // Mostrar mensaje tipo Toast
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
  }
}