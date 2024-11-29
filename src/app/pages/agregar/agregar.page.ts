import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { ProductService } from '../../services/product.service'; // Importar el servicio
import { CategoriaService } from '../../services/categoria.service';
import { ProveedoresService } from '../../services/proveedores.service';
@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  productos: Observable<any[]> | undefined;
  categorias: Observable<any[]> | undefined;
  proveedores: Observable<any[]> | undefined;
  newProduct: any = {
    Nombre: '',
    Descripcion: '',
    Categoria: '',
    Precio: 0,
    Stock: 0,
    proveedor: '',
  };

  constructor(
    private productService: ProductService,
    private categoriasService: CategoriaService,
    private proveedorService : ProveedoresService,
    // Inyectar el servicio
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    // Cargar categorías y proveedores
    this.categorias = this.getCategories();
    this.proveedores = this.getProveedores();
  }

  goToHome() {
    this.navCtrl.navigateRoot('/home'); // Redirige a la página de inicio
  }

  getCategories(): Observable<any[]> {
    return this.categoriasService.getCategorias(); // Si tienes un método en el servicio
  }

  getProveedores(): Observable<any[]> {
    return this.proveedorService.getProveedores(); // Si tienes un método en el servicio
  }

  addProduct() {
    if (
      this.newProduct.Nombre &&
      this.newProduct.Descripcion &&
      this.newProduct.Categoria &&
      this.newProduct.Precio &&
      this.newProduct.Stock &&
      this.newProduct.proveedor 
    ) {
      this.productService
        . addProducto(this.newProduct)
        .then(() => {
          alert('Producto agregado exitosamente');
          this.newProduct = {}; // Limpiar el formulario
          this.navCtrl.navigateForward('/inventario'); // Navegar a la página de inventario
        })
        .catch((error) => {
          alert('Hubo un error al agregar el producto. Intenta de nuevo.');
          console.error('Error al agregar el producto:', error);
        });
    } else {
      alert('Por favor, complete todos los campos');
      console.error('Campos incompletos:', this.newProduct);
    }
  }
}
