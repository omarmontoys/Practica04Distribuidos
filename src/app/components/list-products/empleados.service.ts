import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Respuesta, Usuario } from './empleados.model';
@Injectable({
  providedIn: 'root',
})
export class EmpleadosService {
  private urlApi = 'https://api-usuarios-mongo.onrender.com/socios/v1/users/';

  constructor(private http: HttpClient) {}

  getAllUsuarios(): Observable<Respuesta> {
    return this.http.get<Respuesta>(this.urlApi);
  }

  getUsuarioById(correo: string): Observable<Respuesta> {
    return this.http.get<Respuesta>(this.urlApi + '/' + correo);
  }

  createUsuario(usuario: Usuario): Observable<Respuesta> {
    return this.http.post<Respuesta>(this.urlApi, usuario);
  }

  updateUsuario(correo: string, usuario: Usuario): Observable<Respuesta> {
    return this.http.put<Respuesta>(this.urlApi + '/' + correo, usuario);
  }

  deleteUsuario(correo: string): Observable<Respuesta> {
    return this.http.delete<Respuesta>(this.urlApi + '/' + correo);
  }
}
