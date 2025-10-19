import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface AgendamentoDTO {
  id?: number;
  servico: string;
  profissional: string;
  user: string;
  data: string;
  hora: string;
}

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.css']
})
export class AgendamentoComponent implements OnInit {

  agendamentoForm!: FormGroup;
  profissionais: string[] = [];
  servicos = ['Massagem Relaxante', 'Massagem Terapêutica', 'Drenagem Linfática'];
  successMessage = '';
  errorMessage = '';
  private apiUrl = 'http://localhost:8080/agendamentos';

  today = new Date().toISOString().split('T')[0];
  nomeUsuarioLogado = ''; // 🔸 será preenchido automaticamente

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.recuperarUsuarioLogado();

    this.agendamentoForm = this.fb.group({
      servico: ['', Validators.required],
      profissional: ['', Validators.required],
      data: ['', [Validators.required, this.noSundayValidator]],
      hora: ['', Validators.required],
    });

    this.buscarProfissionais();
  }

  /** 🧠 Obtém o nome do usuário logado */
  recuperarUsuarioLogado() {
    // Exemplo 1: usando localStorage
    this.nomeUsuarioLogado = localStorage.getItem('usuarioNome') || 'Usuário Padrão';

    // Exemplo 2 (futuro): buscar de um serviço de autenticação
    // this.authService.getUsuario().subscribe(user => this.nomeUsuarioLogado = user.nome);
  }

  /** 🔒 Validador: impede domingos e datas passadas */
  noSundayValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    const date = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date < today) return { pastDateNotAllowed: true };
    if (date.getDay() === 0) return { sundayNotAllowed: true };
    return null;
  }

  buscarProfissionais() {
    this.profissionais = ['Ana Silva', 'Carlos Santos', 'Fernanda Lima'];
  }

  onSubmit() {
    if (this.agendamentoForm.invalid) {
      const dataControl = this.agendamentoForm.get('data');
      if (dataControl?.hasError('sundayNotAllowed')) {
        this.errorMessage = 'Domingos não estão disponíveis para agendamento.';
      } else if (dataControl?.hasError('pastDateNotAllowed')) {
        this.errorMessage = 'Não é possível agendar em uma data anterior a hoje.';
      } else {
        this.errorMessage = 'Preencha todos os campos obrigatórios.';
      }
      this.successMessage = '';
      return;
    }

    const novoAgendamento: AgendamentoDTO = {
      ...this.agendamentoForm.value,
      user: this.nomeUsuarioLogado, // 🔹 preenchido automaticamente
    };

    this.http.post(`${this.apiUrl}/cadastrar`, novoAgendamento).subscribe({
      next: (res: any) => {
        this.successMessage = res?.sucesso || 'Agendamento realizado com sucesso!';
        this.errorMessage = '';
        this.agendamentoForm.reset();
      },
      error: (err) => {
        console.error('Erro ao salvar agendamento:', err);
        this.errorMessage = err.error?.error || 'Erro ao salvar o agendamento.';
        this.successMessage = '';
      }
    });
  }
}
