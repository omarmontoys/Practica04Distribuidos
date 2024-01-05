import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Respuesta } from '../interfaces/login.model';

@Injectable({
  providedIn: 'root',
})
export class LoginserviceService {
  private urlApi =
    ' https://api-users-finalproject.onrender.com/socios/v1/users/';
  private tokenKey = 'jwt';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  login(correo: string, clave: string): Observable<Respuesta> {
    const body = { correo, clave };
    return this.http.post<Respuesta>(`${this.urlApi}login`, body);
  }

  setToken(token: string): void {
    this.cookieService.set(this.tokenKey, token);
  }

  getToken(): string | null {
    const token = this.cookieService.get(this.tokenKey);
    return token ? token : null;
  }

  logout(): void {
    // Elimina la cookie al cerrar sesión
    this.cookieService.delete(this.tokenKey, '/', 'localhost');
  }
}
