// src/app/services/notification.service.ts
import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private afMessaging: AngularFireMessaging) {}

  // Solicita permiso para recibir notificaciones push y obtiene el token
  requestPermission() {
    this.afMessaging.requestToken.subscribe(
      (token) => {
        console.log('Token de FCM:', token);
        // Aquí puedes guardar el token en tu backend
      },
      (error) => {
        console.error('Permiso denegado', error);
      }
    );
  }

  // Escucha mensajes mientras la aplicación está en primer plano
  listenForMessages() {
    this.afMessaging.messages.subscribe((message) => {
      console.log('Mensaje recibido:', message);
    });
  }
}
