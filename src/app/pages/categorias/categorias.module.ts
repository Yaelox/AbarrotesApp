import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgregarCategoriaPage } from './categorias.page';
import { CategoriasPageRoutingModule } from './categorias-routing.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CategoriasPageRoutingModule
  ],
  declarations: [AgregarCategoriaPage]
})
export class CategoriasPageModule {}