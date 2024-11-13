import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { NavController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.page.html',
  styleUrls: ['./inventario.page.scss'],
})
export class InventarioPage implements OnInit {
  productos: any[] = [];

  constructor(
    private productService: ProductService,
    private navCtrl: NavController,
    private router: Router,
    private firestore: AngularFirestore,
  ) {}

  ngOnInit() {
    // Obtener los productos cuando la página se carga
    this.productService.getProducts().subscribe((data) => {
      this.productos = data;
    });
  }

  // Método para regresar a la página de inicio
  goToHome() {
    this.navCtrl.navigateRoot('/home');
  }
}
