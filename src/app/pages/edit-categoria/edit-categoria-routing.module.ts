import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditCategoriaPage } from './edit-categoria.page';

const routes: Routes = [
  {
    path: '',
    component: EditCategoriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditCategoriaPageRoutingModule {}
