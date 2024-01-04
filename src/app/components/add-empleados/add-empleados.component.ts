import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/usuario';
import { EmpleadosService } from '../../services/empleados.service';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-empleados.component.html',
  styleUrls: ['./add-empleados.component.css'],
})
export class AddEmpleadosComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuarioEditando: Usuario | null = null;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuarioService: EmpleadosService
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
      this.usuarioService.createUsuario(this.form.value).subscribe({
        next: (v) => {
          console.log('Usuario agregado con éxito:', v);
          this.consultarTodosLosEmpleados();
          // Limpiar el formulario o realizar otras acciones después de agregar el usuario
          this.form.reset(); // Esto limpiará el formulario
        },
        error: (e) => {
          console.error('Error al agregar usuario:', e);
        },
        complete: () =>
          console.info('Se completa la llamada de agregado: Si hay error o no'),
      });
    } else {
      console.error('Formulario no válido. No se puede agregar el usuario.');
    }
  }
}
