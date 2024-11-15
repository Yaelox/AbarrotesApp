import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-agregar-proveedor',
  templateUrl: './proveedores.page.html',
  styleUrls: ['./proveedores.page.scss'],
})
export class AgregarProveedorPage implements OnInit {
  proveedores: Observable<any[]> | undefined;
  newProveedor: any = {
    Nombre: '',
    Contacto: '',
  };
  editing: boolean = false;
  editingId: string | null = null;

  constructor(
    private firestore: AngularFirestore,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    // Load providers from Firestore
    this.proveedores = this.firestore.collection('Proveedores').valueChanges({ idField: 'id' });
  }

  // Method to add a new provider
  addProveedor() {
    if (this.newProveedor.Nombre && this.newProveedor.Contacto) {
      const id = this.firestore.createId();
      this.firestore.collection('Proveedores').doc(id).set({
        Nombre: this.newProveedor.Nombre,
        Contacto: this.newProveedor.Contacto,
        Fechadeagregado: new Date()
      }).then(() => {
        alert('Proveedor agregado exitosamente');
        this.clearForm();
      }).catch(error => {
        console.error('Error al agregar proveedor:', error);
        alert('Hubo un error al agregar el proveedor. Intenta de nuevo.');
      });
    } else {
      alert('Por favor, complete todos los campos');
    }
  }

  // Method to update an existing provider
  updateProveedor() {
    if (this.editingId && this.newProveedor.Nombre && this.newProveedor.Contacto) {
      this.firestore.collection('Proveedores').doc(this.editingId).update({
        Nombre: this.newProveedor.Nombre,
        Contacto: this.newProveedor.Contacto,
        Fechadeactualizacion: new Date()
      }).then(() => {
        alert('Proveedor actualizado exitosamente');
        this.clearForm();
      }).catch(error => {
        console.error('Error al actualizar proveedor:', error);
        alert('Hubo un error al actualizar el proveedor. Intenta de nuevo.');
      });
    } else {
      alert('Por favor, complete todos los campos');
    }
  }

  // Method to load data into the form for editing
  editProveedor(proveedor: any) {
    this.editing = true;
    this.editingId = proveedor.id;
    this.newProveedor = { ...proveedor };
  }

  // Method to delete a provider
  deleteProveedor(id: string) {
    this.firestore.collection('Proveedores').doc(id).delete()
      .then(() => {
        alert('Proveedor eliminado exitosamente');
      })
      .catch(error => {
        console.error('Error al eliminar proveedor:', error);
        alert('Hubo un error al eliminar el proveedor. Intenta de nuevo.');
      });
  }

  // Method to clear the form and reset editing mode
  clearForm() {
    this.newProveedor = { Nombre: '', Contacto: '' };
    this.editing = false;
    this.editingId = null;
  }

  // Method to navigate back to the home page
  goToHome() {
    this.navCtrl.navigateRoot('/home');
  }
}
