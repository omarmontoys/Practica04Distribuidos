import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { AddEditProductComponent } from './components/add-edit-product/add-edit-product.component';
import { LoginUsuarioComponent } from './components/login-usuario/login-usuario.component';
import { EditUsuarioComponent } from './components/edit-usuario/edit-usuario.component';

const routes: Routes = [
  { path: '', component: LoginUsuarioComponent },
  { path: 'usuarios', component: ListProductsComponent },
  { path: 'add', component: AddEditProductComponent },
  { path: 'edit/:correo', component: EditUsuarioComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
