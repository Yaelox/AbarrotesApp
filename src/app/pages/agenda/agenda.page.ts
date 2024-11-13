import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
})
export class AgendaPage {

  constructor(private navCtrl: NavController) { }
  goToHome() {
    // Navegar de regreso a la página Home
    this.navCtrl.navigateBack('/home');
  }

  

}
