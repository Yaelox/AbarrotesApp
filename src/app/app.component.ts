import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { environment } from '../environments/environment';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

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
    this.requestPermission();
    this.listen();
    
  }

  goToHome() {
    this.navCtrl.navigateRoot('/home');
  }

  goToInventario() {
    this.navCtrl.navigateForward('/inventario');
  }

  goToAgenda() {
    this.navCtrl.navigateForward('/agenda');
  }

  requestPermission() {
    const messaging = getMessaging();
    getToken(messaging, { vapidKey: environment.firebaseConfig.vapidKey })
      .then((currentToken) => {
        if (currentToken) {
          console.log("Token received: ", currentToken);
        } else {
          console.log('No registration token available. Request permission to generate one.');
        }
      })
      .catch((err) => {
        console.log('Error retrieving token: ', err);
      });
  }

  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log('Message received: ', payload);
      this.message = payload;
    });
  }
}
