export interface Usuario {
  nombre: string;
  apellidos: string;
  usuario: string;
  correo: string;
  clave: string; // Opcional si es necesario para crear o actualizar
}
