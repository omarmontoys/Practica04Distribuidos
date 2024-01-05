import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Respuesta, Usuario } from '../interfaces/empleados.model';
import { LoginserviceService } from './loginservice.service';

@Injectable({
  providedIn: 'root',
})
export class EmpleadosService {
  private urlApi =
    'https://api-users-finalproject.onrender.com/socios/v1/users/';

  constructor(
    private http: HttpClient,
    private loginService: LoginserviceService
  ) {}

  private getToken(): string {
    return this.loginService.getToken() || 'no hay token';
  }

  getAllUsuarios(): Observable<Respuesta> {
    const token = this.getToken();
    const body = { token }; // Construye el cuerpo de la solicitud con el token
    console.log(body);
    return this.http.post<Respuesta>(this.urlApi, body);
  }

  getUsuarioById(correo: string): Observable<Respuesta> {
    // Agrega las cabeceras con el token a la solicitud
    return this.http.get<Respuesta>(`${this.urlApi}/${correo}`);
  }

  createUsuario(usuario: Usuario): Observable<Respuesta> {
    // Agrega las cabeceras con el token a la solicitud
    return this.http.post<Respuesta>(`${this.urlApi}/add`, usuario);
  }

  updateUsuario(correo: string, usuario: Usuario): Observable<Respuesta> {
    // Agrega las cabeceras con el token a la solicitud
    return this.http.put<Respuesta>(`${this.urlApi}/${correo}`, usuario);
  }

  deleteUsuario(correo: string): Observable<Respuesta> {
    // Agrega las cabeceras con el token a la solicitud
    return this.http.delete<Respuesta>(`${this.urlApi}/${correo}`);
  }
}
