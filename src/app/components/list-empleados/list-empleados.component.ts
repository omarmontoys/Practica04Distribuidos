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
    token: '', // Inicializa el token como una cadena vacía
  };
  usuarioEditando: Usuario | null = null;

  constructor(
    private usuarioService: EmpleadosService,
    private loginService: LoginserviceService
  ) {}

  ngOnInit(): void {
    this.consultarTodosLosEmpleados();
    this.setToken(); // Llamada para establecer el token antes de hacer una solicitud
  }

  setToken() {
    this.nuevoUsuario.token = this.loginService.getToken() || ''; // Asigna el token al objeto nuevoUsuario
  }

  eliminarUsuario(correo: string) {
    // Muestra un cuadro de diálogo de confirmación
    const confirmacion = confirm(
      '¿Estás seguro de que deseas eliminar este usuario?'
    );

    if (confirmacion) {
      this.usuarioService.deleteUsuario(correo).subscribe({
        next: (v) => {
          console.log('Usuario eliminado con éxito:', v);
          this.consultarTodosLosEmpleados();
          // Muestra un alert indicando que el usuario se eliminó con éxito
          alert('Éxito: Usuario eliminado con éxito.');
        },
        error: (e) => {
          console.error('Error al eliminar usuario:');
          // Muestra un alert indicando que hubo un error al eliminar el usuario
          alert('Error: Hubo un error al eliminar el usuario.');
        },
        complete: () =>
          console.info(
            'Se completa la llamada de eliminación: Si hay error o no'
          ),
      });
    } else {
      // Muestra un alert indicando que se canceló la eliminación del usuario
      alert('Cancelado: No se eliminó el usuario.');
    }
  }

  salir() {
    // Lógica para cerrar sesión y redirigir al usuario a la página de inicio de sesión
    this.loginService.logout();
    alert('Sesión cerrada correctamente.');
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
        // Muestra un alert indicando que hubo un error al obtener la lista de usuarios
        alert('Error: Hubo un error al obtener la lista de usuarios.');
      },
      complete: () => console.info('Se completa la llamada: Si hay error o no'),
    });
  }
}
