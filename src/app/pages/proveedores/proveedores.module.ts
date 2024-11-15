import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProveedoresPageRoutingModule } from './proveedores-routing.module';

import { AgregarProveedorPage } from './proveedores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProveedoresPageRoutingModule
  ],
  declarations: [AgregarProveedorPage]
})
export class ProveedoresPageModule {}
