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
    // Clona a requisição adicionando withCredentials para manter sessão/cookies
    const authReq = req.clone({ withCredentials: true });

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // Se receber 401, redireciona para login
        if (error.status === 401) {
          console.warn('Sessão expirada ou usuário não autenticado. Redirecionando...');
          localStorage.removeItem('usuarioLogado'); // limpa estado local
          this.router.navigate(['/logar']);
        }

        // Tratar 403 caso queira alertar usuário
        if (error.status === 403) {
          console.error('Acesso negado: você não tem permissão para acessar este recurso.');
        }

        return throwError(() => error);
      })
    );
  }
}
