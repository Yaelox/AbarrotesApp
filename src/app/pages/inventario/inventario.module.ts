import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InventarioPageRoutingModule } from './inventario-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { InventarioPage } from './inventario.page';
import { ComponentsModule } from 'src/app/components/components.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InventarioPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    

],
  declarations: [InventarioPage]
})
export class InventarioPageModule {}
