import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEmpleadosComponent } from '../components/list-empleados/list-empleados.component';
import { LoginUsuarioComponent } from '../components/login-usuario/login-usuario.component';
import { EditUsuarioComponent } from '../components/edit-usuario/edit-usuario.component';
import { AddEmpleadosComponent } from '../components/add-empleados/add-empleados.component';

const routes: Routes = [
  { path: '', component: LoginUsuarioComponent },
  { path: 'usuarios', component: ListEmpleadosComponent },
  { path: 'add', component: AddEmpleadosComponent },
  { path: 'edit/:correo', component: EditUsuarioComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
