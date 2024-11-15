import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-agregar-categoria',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class AgregarCategoriaPage implements OnInit {
  categorias: Observable<any[]> | undefined;
  newCategoria: any = {
    Nombre: '',
    Descripcion: '',
  };
  editing: boolean = false;
  editingId: string | null = null;

  constructor(
    private firestore: AngularFirestore,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    // Load categories from Firestore
    this.categorias = this.firestore.collection('Categorias').valueChanges({ idField: 'id' });
  }

  // Method to add a new category
  addCategoria() {
    if (this.newCategoria.Nombre && this.newCategoria.Descripcion) {
      const id = this.firestore.createId();
      this.firestore.collection('Categorias').doc(id).set({
        Nombre: this.newCategoria.Nombre,
        Descripcion: this.newCategoria.Descripcion,
        Fechadeagregado: new Date()
      }).then(() => {
        alert('Categoría agregada exitosamente');
        this.clearForm();
      }).catch(error => {
        console.error('Error al agregar categoría:', error);
        alert('Hubo un error al agregar la categoría. Intenta de nuevo.');
      });
    } else {
      alert('Por favor, complete todos los campos');
    }
  }

  // Method to update an existing category
  updateCategoria() {
    if (this.editingId && this.newCategoria.Nombre && this.newCategoria.Descripcion) {
      this.firestore.collection('Categorias').doc(this.editingId).update({
        Nombre: this.newCategoria.Nombre,
        Descripcion: this.newCategoria.Descripcion,
        Fechadeactualizacion: new Date()
      }).then(() => {
        alert('Categoría actualizada exitosamente');
        this.clearForm();
      }).catch(error => {
        console.error('Error al actualizar categoría:', error);
        alert('Hubo un error al actualizar la categoría. Intenta de nuevo.');
      });
    } else {
      alert('Por favor, complete todos los campos');
    }
  }

  // Method to load data into the form for editing
  editCategoria(categoria: any) {
    this.editing = true;
    this.editingId = categoria.id;
    this.newCategoria = { ...categoria };
  }

  // Method to delete a category
  deleteCategoria(id: string) {
    this.firestore.collection('Categorias').doc(id).delete()
      .then(() => {
        alert('Categoría eliminada exitosamente');
      })
      .catch(error => {
        console.error('Error al eliminar categoría:', error);
        alert('Hubo un error al eliminar la categoría. Intenta de nuevo.');
      });
  }

  // Method to clear the form and reset editing mode
  clearForm() {
    this.newCategoria = { Nombre: '', Descripcion: '' };
    this.editing = false;
    this.editingId = null;
  }

  // Method to navigate back to the home page
  goToHome() {
    this.navCtrl.navigateRoot('/home');
  }
}
