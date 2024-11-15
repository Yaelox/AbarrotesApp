import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarCategoriaPage } from './categorias.page';  // Adjust to match the class name


const routes: Routes = [
  {
    path: '',
    component: AgregarCategoriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriasPageRoutingModule {}
