import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {}

  // Método para registrar un usuario
  async register(email: string, password: string, Name: string) {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      
      // Guardar datos del usuario en Firestore
      await this.firestore.collection('Usuarios').doc(userCredential.user?.uid).set({
        uid: userCredential.user?.uid,
        email: email,
        Name: Name,
        createdAt: new Date()
      });
      
      this.router.navigate(['/login']); 
    } catch (error) {
      console.error('Error al registrar:', error);
      throw error;
    }
  }

// Método para iniciar sesión
async login(email: string, password: string) {
  try {
    await this.afAuth.signInWithEmailAndPassword(email, password); 
    this.router.navigate(['/home']); 
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw error;
  }
}

  // Método para cerrar sesión
  async logout() {
    await this.afAuth.signOut();
    this.router.navigate(['/login']); 
  }

  // Obtener usuario actual
  getCurrentUser() {
    return this.afAuth.authState;
  }
}
