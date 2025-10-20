import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, map } from 'rxjs';

export interface UsuarioRegistro {
  nome: string;
  email: string;
  numtel: string;
  dataNascimento?: string;
  senha: string;
}

export interface UsuarioLogado {
  senha: any;
  id: number;
  nome: string;
  email: string;
  numtel: string;
  role: string; // sempre retorna "CLIENTE" ou "ADMIN"
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/users';
  
  private usuarioLogadoSubject = new BehaviorSubject<UsuarioLogado | null>(null);
  usuarioLogado$ = this.usuarioLogadoSubject.asObservable();

  // Campos individuais do usuário
  usuarioId: number | null = null;
  usuarioNome: string | null = null;
  usuarioEmail: string | null = null;
  usuarioNumtel: string | null = null;
  usuarioRole: string | null = null;

  constructor(private http: HttpClient) {
    // Restaura usuário do localStorage ao iniciar app
    const userData = localStorage.getItem('usuarioLogado');
    if (userData) {
      const user: UsuarioLogado = JSON.parse(userData);
      this.setUsuario(user);
    }

    // Atualiza campos individuais sempre que o observable muda
    this.usuarioLogado$.subscribe(user => this.setUsuario(user));
  }

  /** 🔹 Registro */
  registrar(usuario: UsuarioRegistro): Observable<any> {
    return this.http.post(`${this.apiUrl}/cadastrar`, usuario);
  }

  /** 🔹 Login */
  login(email: string, senha: string): Observable<UsuarioLogado> {
    return this.http.post<{ usuario: UsuarioLogado }>(`${this.apiUrl}/login`, { email, senha }).pipe(
      tap(resp => {
        const user = resp.usuario;
        if (!user.role) user.role = 'CLIENTE'; // garante role
        this.usuarioLogadoSubject.next(user);
        localStorage.setItem('usuarioLogado', JSON.stringify(user));
      }),
      map(resp => resp.usuario)
    );
  }

  /** 🔹 Logout */
  logout(): void {
    this.usuarioLogadoSubject.next(null);
    localStorage.removeItem('usuarioLogado');
  }

  /** 🔹 Retorna usuário logado atual */
  getUsuarioLogado(): UsuarioLogado | null {
    return this.usuarioLogadoSubject.value;
  }

  /** 🔹 Atualiza o usuário logado (opcional) */
  atualizarUsuario(user: UsuarioLogado) {
    if (!user.role) user.role = 'CLIENTE';
    this.usuarioLogadoSubject.next(user);
    localStorage.setItem('usuarioLogado', JSON.stringify(user));
  }

  /** 🔹 Atualiza os campos individuais */
  private setUsuario(user: UsuarioLogado | null) {
    if (user) {
      this.usuarioId = user.id;
      this.usuarioNome = user.nome;
      this.usuarioEmail = user.email;
      this.usuarioNumtel = user.numtel;
      this.usuarioRole = user.role;
    } else {
      this.usuarioId = null;
      this.usuarioNome = null;
      this.usuarioEmail = null;
      this.usuarioNumtel = null;
      this.usuarioRole = null;
    }
  }
}
