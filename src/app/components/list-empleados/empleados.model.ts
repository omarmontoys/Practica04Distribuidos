import { Usuario } from 'src/app/interfaces/usuario';
export interface Respuesta {
  estado: number;
  mensaje: string;
  usuarios: Usuario[];
}

export { Usuario };
