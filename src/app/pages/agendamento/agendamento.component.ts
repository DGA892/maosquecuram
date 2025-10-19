import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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
  styleUrls: ['./agendamento.component.css'],
})
export class AgendamentoComponent implements OnInit {
  agendamentoForm!: FormGroup;
  profissionais: string[] = [];
  servicos = ['Massagem Relaxante', 'Massagem Terapêutica', 'Drenagem Linfática'];
  successMessage = '';
  errorMessage = '';

  /** URL da API */
  private apiUrl = 'http://localhost:8080/agendamentos';
  today = new Date().toISOString().split('T')[0];
  nomeUsuarioLogado = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.recuperarUsuarioLogado();
    this.inicializarFormulario();
    this.buscarProfissionais();
  }

  /** 🧩 Inicializa o formulário reativo */
  inicializarFormulario() {
    this.agendamentoForm = this.fb.group({
      servico: ['', Validators.required],
      profissional: ['', Validators.required],
      data: ['', [Validators.required, this.noSundayValidator]],
      hora: ['', Validators.required],
    });
  }

  /** 🧾 Recupera o nome do usuário logado (ajuste conforme seu login real) */
  recuperarUsuarioLogado() {
    this.nomeUsuarioLogado = localStorage.getItem('usuarioNome') || 'Usuário Padrão';
  }

  /** ⛔ Validador: impede domingos e datas passadas */
  noSundayValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    const date = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date < today) return { pastDateNotAllowed: true };
    if (date.getDay() === 0) return { sundayNotAllowed: true };
    return null;
  }

  /** 👩‍⚕️ Mock: lista de profissionais (pode vir do backend futuramente) */
  buscarProfissionais() {
    this.profissionais = ['Ana Silva', 'Carlos Santos', 'Fernanda Lima'];
  }

  /** 🚀 Envia o formulário para o backend */
  onSubmit(): void {
    if (this.agendamentoForm.invalid) {
      this.tratarMensagensDeErro();
      return;
    }

    const novoAgendamento: AgendamentoDTO = {
      ...this.agendamentoForm.value,
      user: this.nomeUsuarioLogado,
    };

    console.log('🔹 Enviando agendamento:', novoAgendamento);

    this.http.post(`${this.apiUrl}/cadastrar`, novoAgendamento).subscribe({
      next: (res: any) => {
        console.log('✅ Resposta do servidor:', res);
        this.successMessage = res?.sucesso || 'Agendamento realizado com sucesso!';
        this.errorMessage = '';
        this.agendamentoForm.reset();

        // Redirecionar após sucesso (opcional)
        setTimeout(() => this.router.navigate(['/']), 2000);
      },
      error: (err) => {
        console.error('❌ Erro ao salvar agendamento:', err);
        this.errorMessage =
          err.error?.message || err.error?.error || 'Erro ao salvar o agendamento.';
        this.successMessage = '';
      },
    });
  }

  onDateChange(event: Event): void {
  const input = event.target as HTMLInputElement;
  const selectedDate = new Date(input.value);
  const dayOfWeek = selectedDate.getDay();

  // Se for domingo, mostra mensagem de erro e limpa o campo
  if (dayOfWeek === 0) {
    this.agendamentoForm.get('data')?.setErrors(dayOfWeek === 0 ? { sundayNotAllowed: true } : null);
    this.errorMessage = 'Domingos estão indisponíveis para agendamento.';
  } else {
    // Remove erro se o usuário mudar para um dia válido
    this.agendamentoForm.get('data')?.setErrors(null);
    this.errorMessage = '';
  }
}


  /** ⚠️ Exibe mensagens específicas de erro */
  private tratarMensagensDeErro() {
    const dataControl = this.agendamentoForm.get('data');
    if (dataControl?.hasError('sundayNotAllowed')) {
      this.errorMessage = 'Domingos não estão disponíveis para agendamento.';
    } else if (dataControl?.hasError('pastDateNotAllowed')) {
      this.errorMessage = 'Não é possível agendar em uma data anterior a hoje.';
    } else {
      this.errorMessage = 'Preencha todos os campos obrigatórios.';
    }
    this.successMessage = '';
  }
}
