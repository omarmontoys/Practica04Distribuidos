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

  constructor(
    private authService: LoginserviceService,
    private router: Router
  ) {}

  onSubmit() {
    if (!this.correo || !this.clave) {
      // Muestra un alert si el correo o la contraseña están vacíos
      alert('Error: Por favor, ingresa el correo y la contraseña.');
      return;
    }

    this.authService.login(this.correo, this.clave).subscribe(
      (response) => {
        if (response.estado === 1) {
          console.log('Respuesta del servidor:', response);
          this.authService.setToken(response.Token);
          this.router.navigate(['/usuarios']);
          // Muestra un alert si el inicio de sesión es exitoso
          alert('Éxito: Inicio de sesión correcto.');
        } else {
          console.error(
            'Error en el inicio de sesión correo o contraseña incorrectos'
          );
          // Muestra un alert si el inicio de sesión falla
          alert('Error en el inicio de sesión correo o contraseña incorrectos');
        }
      },
      (error) => {
        console.error('Error en la solicitud:', error);
        // Muestra un alert si hay un error en la solicitud
        alert('Error en el inicio de sesión correo o contraseña incorrectos');
      },
      () => {
        // Verificar si hay un token después de la solicitud completa
        if (this.authService.getToken() === null) {
          this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión si no hay token
        }
      }
    );
  }
}
