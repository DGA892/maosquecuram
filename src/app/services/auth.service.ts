import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';

export interface UsuarioRegistro {
  nome: string;
  email: string;
  numtel: string;
  dataNascimento: string;
  senha: string;
}

export interface UsuarioLogado {
  id: number;
  nome: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/usuarios';
  private usuarioLogadoSubject = new BehaviorSubject<UsuarioLogado | null>(null);

  usuarioLogado$ = this.usuarioLogadoSubject.asObservable();

  constructor(private http: HttpClient) {
    // Restaura sessão se houver no localStorage
    const userData = localStorage.getItem('usuarioLogado');
    if (userData) {
      this.usuarioLogadoSubject.next(JSON.parse(userData));
    }
  }

  /** 🔹 Registro */
  registrar(usuario: UsuarioRegistro): Observable<any> {
    return this.http.post(`${this.apiUrl}/registrar`, usuario);
  }

  /** 🔹 Login — simulação ou backend real */
  login(email: string, senha: string): Observable<UsuarioLogado> {
    return this.http.post<UsuarioLogado>(`${this.apiUrl}/login`, { email, senha }).pipe(
      tap(user => {
        // Salva usuário logado em memória e localStorage
        this.usuarioLogadoSubject.next(user);
        localStorage.setItem('usuarioLogado', JSON.stringify(user));
      })
    );
  }

  /** 🔹 Logout */
  logout(): void {
    this.usuarioLogadoSubject.next(null);
    localStorage.removeItem('usuarioLogado');
  }

  /** 🔹 Retorna o usuário logado atual */
  getUsuarioLogado(): UsuarioLogado | null {
    return this.usuarioLogadoSubject.value;
  }
}
