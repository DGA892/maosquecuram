import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment'; // ajuste se o caminho for diferente

export interface Agendamento {
  id?: number;
  servico: string;
  profissional: string;
  user: string;
  data: string; // formato: YYYY-MM-DD
  hora: string; // formato: HH:mm
}

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {
  private apiUrl = `${environment.apiUrl}/agendamentos`; // ex: http://localhost:8080/agendamentos

  constructor(private http: HttpClient) {}

  /** 🧾 Listar todos os agendamentos */
  getAgendamentos(): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(`${this.apiUrl}`).pipe(
      catchError(err => {
        console.error('Erro ao listar agendamentos:', err);
        return throwError(() => new Error('Falha ao buscar agendamentos.'));
      })
    );
  }

  /** 🔍 Buscar agendamento por ID */
  getAgendamentoById(id: number): Observable<Agendamento> {
    return this.http.get<Agendamento>(`${this.apiUrl}/${id}`).pipe(
      catchError(err => {
        console.error(`Erro ao buscar agendamento com ID ${id}:`, err);
        return throwError(() => new Error('Falha ao buscar o agendamento.'));
      })
    );
  }

  /** 🗓️ Criar novo agendamento */
  criarAgendamento(agendamento: Agendamento): Observable<any> {
    return this.http.post(`${this.apiUrl}/cadastrar`, agendamento).pipe(
      catchError(err => {
        console.error('Erro ao criar agendamento:', err);
        return throwError(() => new Error('Falha ao criar agendamento.'));
      })
    );
  }

  /** ✏️ Atualizar agendamento existente */
  atualizarAgendamento(id: number, agendamento: Agendamento): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, agendamento).pipe(
      catchError(err => {
        console.error(`Erro ao atualizar agendamento com ID ${id}:`, err);
        return throwError(() => new Error('Falha ao atualizar agendamento.'));
      })
    );
  }

  /** ❌ Deletar agendamento */
  deletarAgendamento(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`).pipe(
      catchError(err => {
        console.error(`Erro ao deletar agendamento com ID ${id}:`, err);
        return throwError(() => new Error('Falha ao deletar agendamento.'));
      })
    );
  }
}
