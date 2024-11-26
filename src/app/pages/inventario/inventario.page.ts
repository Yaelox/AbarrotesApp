import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService, Producto } from '../../services/product.service';
import { CategoriaService } from '../../services/categoria.service'; // Servicio para categorías
import { ProveedoresService } from '../../services/proveedores.service'; // Servicio para proveedores
import { ToastController, AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.page.html',
  styleUrls: ['./inventario.page.scss'],
})
export class InventarioPage implements OnInit {
  productos: Producto[] = [];
  categorias: any[] = []; // Almacenará las categorías disponibles
  proveedores: any[] = []; // Almacenará los proveedores disponibles
  isEditModalOpen = false; // Controla la visibilidad del modal
  editForm: FormGroup; // Formulario para editar
  selectedProductId: string | null = null; // ID del producto seleccionado

  constructor(
    private productService: ProductService,
    private categoryService: CategoriaService, // Inyectar el servicio de categorías
    private providerService: ProveedoresService, // Inyectar el servicio de proveedores
    private fb: FormBuilder,
    private toastController: ToastController,
    private alertController: AlertController,
    private navCtrl: NavController
  ) {
    // Inicializar formulario
    this.editForm = this.fb.group({
      Nombre: ['', Validators.required],
      Precio: [0, [Validators.required, Validators.min(0)]],
      Stock: [0, [Validators.required, Validators.min(0)]],
      Categoria: ['', Validators.required], // Campo de selección para categorías
      proveedor: ['', Validators.required], // Campo de selección para proveedores
    });
  }

  ngOnInit() {
    this.loadProductos();
    this.loadCategorias();
    this.loadProveedores();
  }

  goToHome() {
    this.navCtrl.navigateRoot('/home');
  }

  // Cargar productos desde Firebase
  loadProductos() {
    this.productService.getProducts().subscribe((data) => {
      this.productos = data;
    });
  }

  loadCategorias() {
    this.categoryService.getCategorias().subscribe((data) => {
      console.log('Categorías:', data); // Verifica si llegan las categorías
      this.categorias = data;
    });
  }
  
  loadProveedores() {
    this.providerService.getProveedores().subscribe((data) => {
      console.log('Proveedores:', data); // Verifica si llegan los proveedores
      this.proveedores = data;
    });
  }
  // Abrir modal de edición
  openEditModal(producto: Producto) {
    this.isEditModalOpen = true;
    this.selectedProductId = producto.id || null;
    this.editForm.patchValue({
      Nombre: producto.Nombre,
      Precio: producto.Precio,
      Stock: producto.Stock,
      Categoria: producto.Categoria,
      proveedor: producto.proveedor,
    });
  }

  // Cerrar modal
  closeEditModal() {
    this.isEditModalOpen = false;
    this.selectedProductId = null;
    this.editForm.reset();
  }

  // Guardar cambios en Firebase
  async submitEdit() {
    if (this.editForm.invalid || !this.selectedProductId) {
      return;
    }

    const updatedProducto: Producto = {
      ...this.editForm.value,
    };

    await this.productService
      .updateProduct(this.selectedProductId, updatedProducto)
      .then(() => {
        this.showToast('Producto actualizado correctamente');
        this.loadProductos();
        this.closeEditModal();
      })
      .catch(() => {
        this.showToast('Error al actualizar el producto');
      });
  }

  // Eliminar producto
  async deleteProducto(id: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de eliminar este producto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.productService.deleteProduct(id).then(() => {
              this.showToast('Producto eliminado correctamente');
              this.loadProductos();
            });
          },
        },
      ],
    });
    await alert.present();
  }

  // Mostrar notificaciones
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
  }
}
