import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginserviceService } from '../services/loginservice.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginserviceService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.loginService.getToken();

    if (token) {
      console.log('No hay token');

      request = request.clone({
        withCredentials: true,
        headers: request.headers.set('Authorization', 'Bearer ' + token),
      });
    }

    return next.handle(request);
  }
}