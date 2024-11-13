import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditCategoriaPageRoutingModule } from './edit-categoria-routing.module';

import { EditCategoriaPage } from './edit-categoria.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditCategoriaPageRoutingModule
  ],
  declarations: [EditCategoriaPage]
})
export class EditCategoriaPageModule {}
