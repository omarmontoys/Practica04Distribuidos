import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from '../app.component';
//Modulos
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
//Componentes
import { NavbarComponent } from '../components/navbar/navbar.component';
import { ListEmpleadosComponent } from '../components/list-empleados/list-empleados.component';
import { AddEmpleadosComponent } from '../components/add-empleados/add-empleados.component';
import { LoginUsuarioComponent } from '../components/login-usuario/login-usuario.component';
import { EditUsuarioComponent } from '../components/edit-usuario/edit-usuario.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { TokenInterceptor } from './api-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListEmpleadosComponent,
    AddEmpleadosComponent,
    LoginUsuarioComponent,
    EditUsuarioComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    
  ],
  providers: [CookieService, ],
  bootstrap: [AppComponent],
})
export class AppModule {}
