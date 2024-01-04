// login-usuario.component.ts
import { Component } from '@angular/core';
import { LoginserviceService } from '../../services/loginservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.css'],
})
export class LoginUsuarioComponent {
  correo: string = '';
  clave: string = '';

  constructor(private authService: LoginserviceService, private router: Router) {}

  onSubmit() {
    if (!this.correo || !this.clave) {
      return;
    }

    this.authService.login(this.correo, this.clave).subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        if (response.estado === 1) {
          console.log('Respuesta del servidor:', response);
          this.authService.setToken(response.Token);
          this.router.navigate(['/usuarios']);
        } else {
          console.error('Error en el inicio de sesión:', response.mensaje);
        }
      },
      (error) => {
        console.error('Error en la solicitud:', error);
      }
    );
  }
}
