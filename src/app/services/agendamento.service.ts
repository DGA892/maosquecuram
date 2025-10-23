import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

// Interface equivalente ao AgendamentoDTO do backend
export interface Agendamento {
  id?: number;
  servico: string;
  profissional: string;
  user: string;
  data: string; // formato: 'YYYY-MM-DD' (LocalDate no backend)
  hora: string; // formato: 'HH:mm:ss' (LocalTime no backend)
}

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {
  private apiUrl = `${environment.apiUrl}/agendamentos`;

  constructor(private http: HttpClient) {}

  /** 🧾 Listar todos os agendamentos */
  getAgendamentos(): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(this.apiUrl).pipe(
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
    const payload = {
      ...agendamento,
      data: agendamento.data,
      hora: agendamento.hora.length === 5 ? `${agendamento.hora}:00` : agendamento.hora
    };

    return this.http.post(`${this.apiUrl}/cadastrar`, payload).pipe(
      catchError(err => {
        console.error('Erro ao criar agendamento:', err);
        return throwError(() => new Error('Falha ao criar agendamento.'));
      })
    );
  }

  /** ✏️ Atualizar agendamento existente */
  atualizarAgendamento(id: number, agendamento: Agendamento): Observable<any> {
    const payload = {
      ...agendamento,
      data: agendamento.data,
      hora: agendamento.hora.length === 5 ? `${agendamento.hora}:00` : agendamento.hora
    };

    return this.http.put(`${this.apiUrl}/update/${id}`, payload).pipe(
      catchError(err => {
        console.error(`Erro ao atualizar agendamento com ID ${id}:`, err);
        return throwError(() => new Error('Falha ao atualizar agendamento.'));
      })
    );
  }

  /** ❌ Excluir agendamento */
  deletarAgendamento(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`).pipe(
      catchError(err => {
        console.error(`Erro ao deletar agendamento com ID ${id}:`, err);
        return throwError(() => new Error('Falha ao deletar agendamento.'));
      })
    );
  }

  /** 📅 Buscar dias com agendamentos em um mês específico */
  getDiasComAgendamentos(year: number, month: number): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}/month/${year}/${month}`).pipe(
      catchError(err => {
        console.error('Erro ao buscar dias com agendamentos:', err);
        return throwError(() => new Error('Falha ao buscar agendamentos do mês.'));
      })
    );
  }

  /** 📅 Buscar agendamentos de um dia específico */
  getAgendamentosDoDia(date: string): Observable<{ [hour: string]: Agendamento }> {
    return this.http.get<{ [hour: string]: Agendamento }>(`${this.apiUrl}/day/${date}`).pipe(
      catchError(err => {
        console.error('Erro ao buscar agendamentos do dia:', err);
        return throwError(() => new Error('Falha ao buscar agendamentos do dia.'));
      })
    );
  }
}
