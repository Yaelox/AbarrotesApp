import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { environment } from '../environments/environment';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { PushNotifications, PermissionStatus } from '@capacitor/push-notifications';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'af-notification';
  message: any = null;

  constructor(private navCtrl: NavController) {}

  ngOnInit(): void {
    this.initializePushNotifications();
    this.requestFirebasePermission();
    this.listenToFirebaseMessages();
  }

  /**
   * Inicializa las notificaciones push usando Capacitor
   */
  async initializePushNotifications() {
    const permissionStatus: PermissionStatus = await PushNotifications.checkPermissions();

    if (permissionStatus.receive !== 'granted') {
      const result = await PushNotifications.requestPermissions();
      if (result.receive !== 'granted') {
        console.log('Permisos para notificaciones no concedidos');
        return;
      }
    }

    console.log('Notificaciones push habilitadas mediante Capacitor');
  }

  /**
   * Solicita permiso para notificaciones con Firebase y obtiene el token
   */
  requestFirebasePermission() {
    const messaging = getMessaging();
    getToken(messaging, { vapidKey: environment.firebaseConfig.vapidKey })
      .then((currentToken) => {
        if (currentToken) {
          console.log('Token de notificación recibido: ', currentToken);
        } else {
          console.log(
            'No se pudo generar el token. Solicita permisos para habilitar las notificaciones.'
          );
        }
      })
      .catch((err) => {
        console.error('Error al recuperar el token: ', err);
      });
  }

  /**
   * Escucha mensajes push en tiempo real de Firebase
   */
  listenToFirebaseMessages() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log('Mensaje recibido: ', payload);
      this.message = payload; // Guardar el mensaje recibido para mostrarlo en la UI si es necesario
    });
  }

  /**
   * Navegación entre páginas
   */
  goToHome() {
    this.navCtrl.navigateRoot('/home');
  }

  goToInventario() {
    this.navCtrl.navigateForward('/inventario');
  }

  goToAgenda() {
    this.navCtrl.navigateForward('/agenda');
  }
}
