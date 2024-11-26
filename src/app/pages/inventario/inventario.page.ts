import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService, Producto } from '../../services/product.service';
import { ToastController, AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.page.html',
  styleUrls: ['./inventario.page.scss'],
})
export class InventarioPage implements OnInit {
  productos: Producto[] = [];
  isEditModalOpen = false; // Controla la visibilidad del modal
  editForm: FormGroup; // Formulario para editar
  selectedProductId: string | null = null; // ID del producto seleccionado

  constructor(
    private productService: ProductService,
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
      Categoria: ['', Validators.required],
      proveedor: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadProductos();
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
