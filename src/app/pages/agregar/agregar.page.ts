import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular'; // Importar NavController

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  productos: Observable<any[]> | undefined;
  categorias: Observable<any[]> | undefined; 
  proveedores: Observable<any[]> | undefined;// Variable para almacenar categorías
  newProduct: any = {
    Nombre: '',
    Descripcion: '',
    Categoria: '',
    Precio: 0,
    Stock: 0,
    proveedor: '',
  };

  constructor(
    private firestore: AngularFirestore,
    private navCtrl: NavController // Inyectar NavController
  ) {}

  ngOnInit() {
    // Obtener los productos desde Firestore
    this.productos = this.firestore.collection('Productos').valueChanges({ idField: 'id' });

    // Obtener las categorías desde Firestore
    this.categorias = this.getCategories();

    this.proveedores = this.getProveedores();
  }
  
  goToHome() {
    this.navCtrl.navigateRoot('/home'); // Redirige a la página de inicio
  }
  
  getCategories(): Observable<any[]> {
    return this.firestore.collection('Categorias').valueChanges(); // Cambia 'Categorías' por el nombre de tu colección de categorías
  }

  getProveedores(): Observable<any[]>{
    return this.firestore.collection('Proveedores').valueChanges();
  }

  // Método para agregar un producto
  addProduct() {
    if (this.newProduct.Nombre && this.newProduct.Descripcion) {
      const id = this.firestore.createId(); // Crear un ID único
      this.firestore.collection('Productos').doc(id).set({
        Nombre: this.newProduct.Nombre,
        Descripcion: this.newProduct.Descripcion,
        Categoria: this.newProduct.Categoria,
        Precio: this.newProduct.Precio,
        Stock: this.newProduct.Stock,
        proveedor: this.newProduct.proveedor,
        Fechadeagregado: new Date()
      }).then(() => {
        alert('Producto agregado exitosamente');
        this.newProduct = {}; // Limpiar el formulario
        this.navCtrl.navigateForward('/inventario'); // Navegar a la página de inventario
      }).catch(error => {
        console.error('Error al agregar producto:', error);
        alert('Hubo un error al agregar el producto. Intenta de nuevo.');
      });
    } else {
      alert('Por favor, complete todos los campos');
    }
  }
}
