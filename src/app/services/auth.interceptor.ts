import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Obtém o token salvo (ex: no localStorage)
    const token = localStorage.getItem('token');

    let authReq = req;

    // Se houver token, adiciona o cabeçalho Authorization
    if (token) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true, // importante para manter cookies e sessões
      });
    } else {
      authReq = req.clone({ withCredentials: true });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // Trata erros de autenticação
        if (error.status === 401) {
          console.warn('Sessão expirada. Redirecionando para login...');
          localStorage.removeItem('token');
          this.router.navigate(['/logar']);
        }

        if (error.status === 403) {
          console.error('Acesso negado: você não tem permissão.');
        }

        return throwError(() => error);
      })
    );
  }
}
