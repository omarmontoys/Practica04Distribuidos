import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/usuario';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { LoginserviceService } from 'src/app/services/loginservice.service';

@Component({
  selector: 'app-register-usuario',
  templateUrl: './register-usuario.component.html',
  styleUrls: ['./register-usuario.component.css'],
})
export class RegisterUsuarioComponent {
  usuarios: Usuario[] = [];
  usuarioEditando: Usuario | null = null;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuarioService: EmpleadosService,
    private loginService: LoginserviceService
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      usuario: ['', Validators.required],
      correo: ['', Validators.required],
      clave: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

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

  agregarUsuario() {
    // Verifica si el formulario es válido antes de realizar la acción
    if (this.form.valid) {
      const nuevoUsuario = this.form.value;

      this.loginService.createUsuario(nuevoUsuario).subscribe({
        next: (v) => {
          console.log('Usuario agregado con éxito:', v);
          this.consultarTodosLosEmpleados();
          // Limpiar el formulario o realizar otras acciones después de agregar el usuario
          this.form.reset(); // Esto limpiará el formulario
          // Muestra un alert indicando que el usuario se agregó con éxito
          alert('Éxito: Usuario agregado con éxito.');
        },
        error: (e) => {
          console.error('Error al agregar usuario:', e);
          // Muestra un alert indicando que hubo un error al agregar el usuario
          alert('Error: Hubo un error al agregar el usuario.');
        },
        complete: () =>
          console.info('Se completa la llamada de agregado: Si hay error o no'),
      });
    } else {
      console.error('Formulario no válido. No se puede agregar el usuario.');
      // Muestra un alert indicando que el formulario no es válido
      alert(
        'Error: El formulario no es válido. No se puede agregar el usuario.'
      );
    }
  }
}
