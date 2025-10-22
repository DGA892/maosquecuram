import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Professional {
  id?: number;
  nome: string;
  email: string;
  cpf: string;
  numtel: string;
  senha: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProfissionalService {

  private apiUrl = 'http://localhost:8080/api/professionals'; // ajuste conforme seu backend

  constructor(private http: HttpClient) {}

    getProfissionais(): Observable<Professional[]> {
    return this.http.get<Professional[]>(this.apiUrl);
  }

  getProfissionalById(id: number): Observable<Professional> {
    return this.http.get<Professional>(`${this.apiUrl}/${id}`);
  }

  addProfissional(profissional: Professional): Observable<Professional> {
    return this.http.post<Professional>(this.apiUrl, profissional);
  }

  updateProfissional(id: number, profissional: Professional): Observable<Professional> {
    return this.http.put<Professional>(`${this.apiUrl}/${id}`, profissional);
  }

  deleteProfissional(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
