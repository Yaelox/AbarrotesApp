import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService, Producto } from '../../services/product.service';
import { CategoriaService } from '../../services/categoria.service'; // Servicio para categorías
import { ProveedoresService } from '../../services/proveedores.service'; // Servicio para proveedores
import { ToastController, AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
=======
>>>>>>> parent of ad224c2 (Mejora de page inventario)
import { ProductService } from '../../services/product.service';
import { NavController, ModalController, AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CategoriaService } from '../../services/categoria.service';  // Verifica que la ruta del archivo sea correcta
 // Asegúrate de importar el servicio de categorías
import { ProveedoresService } from '../../services/proveedores.service'; // Asegúrate de importar el servicio de proveedores
<<<<<<< HEAD
=======

export interface Producto {
  id?: string;
  Nombre: string;
  Precio: number;
  Stock: number;
  Categoria: string;
  Descripcion: string;
  Fechadeagregado: any;
  proveedor: string;
}
>>>>>>> parent of ad224c2 (Mejora de page inventario)

export interface Producto {
  id?: string;
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
<<<<<<< HEAD
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
=======
  categorias: string[] = [];
  proveedores: string[] = [];

  constructor(
    private productService: ProductService,
    private navCtrl: NavController,
    private router: Router,
    private firestore: AngularFirestore,
    private alertController: AlertController,
    private toastController: ToastController,
    private categoriaService: CategoriaService,  // Instanciamos el servicio de categorías
    private proveedoresService: ProveedoresService   // Instanciamos el servicio de proveedores
  ) {}

  ngOnInit() {
    // Obtener productos
    this.productService.getProducts().subscribe((data) => {
      this.productos = data;
    });

    // Obtener categorías y proveedores
    this.categoriaService.getCategorias().subscribe((data) => {
      this.categorias = data;
    });

    this.proveedoresService.getProveedores().subscribe((data) => {
      this.proveedores = data;
    });
  }

>>>>>>> parent of ad224c2 (Mejora de page inventario)
  loadProductos() {
    this.productService.getProducts().subscribe((data) => {
      this.productos = data; // Recarga los productos en la lista
    });
  }

  goToHome() {
    this.navCtrl.navigateRoot('/home');
  }
<<<<<<< HEAD


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

=======

  async editProducto(producto: Producto) {
>>>>>>> parent of ad224c2 (Mejora de page inventario)
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
