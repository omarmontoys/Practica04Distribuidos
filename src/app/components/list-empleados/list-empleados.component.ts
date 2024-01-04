import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from '../../services/empleados.service';
import { Usuario } from '../../interfaces/empleados.model';
import { LoginserviceService } from 'src/app/services/loginservice.service';

@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css'],
})
export class ListEmpleadosComponent implements OnInit {
  usuarios: Usuario[] = [];
  nuevoUsuario: Usuario = {
    nombre: '',
    apellidos: '',
    usuario: '',
    correo: '',
    clave: '',
    createdBy: '',
    token: '',  // Inicializa el token como una cadena vacía
  };
  usuarioEditando: Usuario | null = null;

  constructor(private usuarioService: EmpleadosService, private loginService: LoginserviceService) {}

  ngOnInit(): void {
    this.consultarTodosLosEmpleados();
    this.setToken();  // Llamada para establecer el token antes de hacer una solicitud
  }

  setToken() {
    this.nuevoUsuario.token = this.loginService.getToken() || '';  // Asigna el token al objeto nuevoUsuario
  }
  

  eliminarUsuario(correo: string) {
    this.usuarioService.deleteUsuario(correo).subscribe({
      next: (v) => {
        console.log('Usuario eliminado con éxito:', v);
        this.consultarTodosLosEmpleados();
      },
      error: (e) => {
        console.error('Error al eliminar usuario:', e);
      },
      complete: () =>
        console.info(
          'Se completa la llamada de eliminación: Si hay error o no'
        ),
    });
  }
  salir() {
    this.loginService.logout()
  }

  consultarTodosLosEmpleados() {
    this.usuarioService.getAllUsuarios().subscribe({
      next: (v) => {
        if (v && v.usuarios) {
          this.usuarios = v.usuarios;
        } else {
          console.error(
            'La respuesta del servicio no tiene la estructura esperada.'
          );
        }
      },
      error: (e) => {
        console.error('Error:', e);
      },
      complete: () => console.info('Se completa la llamada: Si hay error o no'),
    });
  }
}

