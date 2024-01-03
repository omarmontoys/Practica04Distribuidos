import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Respuesta, Usuario } from './login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {
  private urlApi = 'https://api-users-finalproject.onrender.com/socios/v1/users/';
  private tokenKey = 'jwt';

  constructor(private http: HttpClient) {}

  login(correo: string, clave: string): Observable<Respuesta> {
    const body = { correo, clave };
    return this.http.post<Respuesta>(`${this.urlApi}login`, body);
  }
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    // Elimina el token al cerrar sesión
    localStorage.removeItem(this.tokenKey);
  }
}
