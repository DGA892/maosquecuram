import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Servico {
  id?: number; // opcional, usado para update
  nome: string;
  descricao: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServicosService {

  private baseUrl = 'http://localhost:8080/servicos'; // ajuste a porta se necessário

  constructor(private http: HttpClient) { }

  // LISTAR TODOS
  getAll(): Observable<Servico[]> {
    return this.http.get<Servico[]>(`${this.baseUrl}/buscar`);
  }

  // CADASTRAR
  save(servico: Servico): Observable<any> {
    return this.http.post(`${this.baseUrl}/cadastrar`, servico);
  }

  // ATUALIZAR
  update(id: number, servico: Servico): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${id}`, servico);
  }

  // DELETAR
  delete(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/delete/${id}`);
  }
}
