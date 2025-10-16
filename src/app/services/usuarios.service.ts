import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuario {
  id?: number;
  nome: string;
  email: string;
  senha?: string;
  telefone: string;
  dataNascimento: string;
  foto?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = 'http://localhost:8080/users'; // ajuste conforme seu backend

  constructor(private http: HttpClient) {}

  

  /** 🔹 Buscar todos os usuários (caso precise listar) */
  getAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/buscar`);
  }

  /** 🔹 Buscar um usuário específico pelo ID */
  getUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  /** 🔹 Criar novo usuário (cadastro) */
  create(usuario: Usuario): Observable<any> {
    return this.http.post(`${this.apiUrl}/cadastrar`, usuario);
  }

  /** 🔹 Atualizar usuário existente */
  updateUsuario(id: number, usuario: Usuario): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, usuario);
  }

  /** 🔹 Excluir usuário */
  deleteUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}
