import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, finalize } from 'rxjs';
import { Respuesta, Usuario } from '../components/list-empleados/empleados.model';
import { LoginserviceService } from './loginservice.service';

@Injectable({
  providedIn: 'root',
})
export class EmpleadosService {
  private urlApi = 'https://api-users-finalproject.onrender.com/socios/v1/users/';

  constructor(private http: HttpClient,private loginService: LoginserviceService) {}

  private getHeaders(): HttpHeaders {
    const token = this.loginService.getToken();
    console.log('token:', token)// Obtén el token almacenado en localStorage
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `bearer ${token}`,
    });
  }

  getAllUsuarios(): Observable<Respuesta> {
    // Agrega las cabeceras con el token a la solicitud
    return this.http.get<Respuesta>(this.urlApi,{ headers: this.getHeaders() });
    
  }

  getUsuarioById(correo: string): Observable<Respuesta> {
    // Agrega las cabeceras con el token a la solicitud
    return this.http.get<Respuesta>(`${this.urlApi}/${correo}`);
  }

  createUsuario(usuario: Usuario): Observable<Respuesta> {
    // Agrega las cabeceras con el token a la solicitud
    return this.http.post<Respuesta>(this.urlApi, usuario);
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
