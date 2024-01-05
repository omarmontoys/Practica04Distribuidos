import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/usuario';
import { EmpleadosService } from '../../services/empleados.service';
import { ActivatedRoute } from '@angular/router';
import { Respuesta } from '../../interfaces/empleados.model';

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrls: ['./edit-usuario.component.css'],
})
export class EditUsuarioComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuarioEditando: Usuario | null = null;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuarioService: EmpleadosService,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      nombre: [''],
      apellidos: [''],
      clave: [''],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const correo = params.get('correo');
      if (correo) {
        this.loadUsuario(correo);
      }
    });
  }

  private loadUsuario(correo: string): void {
    this.usuarioService.getUsuarioById(correo).subscribe(
      (response: Respuesta) => {
        if (
          response.estado == 1 &&
          response.mensaje == 'Usuario encontrado' &&
          response.usuarios &&
          response.usuarios.length > 0
        ) {
          this.usuarioEditando = response.usuarios[0];
          this.populateForm();
        } else {
          console.error('Respuesta no válida:', response);
        }
      },
      (error) => {
        console.error('Error al cargar el usuario', error);
      }
    );
  }

  private populateForm(): void {
    if (this.usuarioEditando) {
      this.form.patchValue({
        nombre: this.usuarioEditando.nombre,
        apellidos: this.usuarioEditando.apellidos,
        clave: '',
      });
    }
  }

  guardarCambios(): void {
    if (this.usuarioEditando) {
      const correo = this.usuarioEditando.correo;
      const usuarioModificado = this.form.value;

      this.usuarioService.updateUsuario(correo, usuarioModificado).subscribe(
        (response: Respuesta) => {
          console.log('Usuario actualizado con éxito', response);
          // Muestra un alert indicando que el usuario se actualizó con éxito
          alert('Éxito: Usuario actualizado con éxito.');
        },
        (error) => {
          console.error('Error al actualizar el usuario', error);
          // Muestra un alert indicando que hubo un error al actualizar el usuario
          alert('Error: Hubo un error al actualizar el usuario.');
        }
      );
    }
  }
}
