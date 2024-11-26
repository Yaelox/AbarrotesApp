import { NgModule, isDevMode, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { FormsModule } from '@angular/forms';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { initializeApp } from 'firebase/app';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { CategoriaService } from './services/categoria.service';
import { ProveedoresService } from './services/proveedores.service';

initializeApp(environment.firebaseConfig);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(), // Desactiva el service worker en modo desarrollo
      registrationStrategy: 'registerWhenStable:30000', // Registra el worker cuando la app esté estable o después de 30s
    })
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy}],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],  // Añade esta línea para permitir elementos web personalizados
})
export class AppModule {}
