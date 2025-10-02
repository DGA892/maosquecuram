import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'maosquecuram';

  // Variáveis de controle de modal
  isModalOpen = false;

  constructor() {}

  ngAfterViewInit(): void {
    // Carregar scripts externos (se necessário)
    const script = document.createElement('script');
    script.src = 'assets/js/main.js';
    script.async = true;
    document.body.appendChild(script);
  }

  // Abre o modal de agendamento
  abrirModal(): void {
    this.isModalOpen = true;
    this.carregarProfissionais();
  }

  // Fecha o modal de agendamento
  fecharModal(): void {
    this.isModalOpen = false;
  }

  // Busca os profissionais do backend
  async carregarProfissionais(): Promise<void> {
    try {
      const resp = await fetch('/professionals/api');
      const profissionais = await resp.json();
      // Aqui você pode popular uma variável no componente e usar *ngFor no template
      console.log('Profissionais:', profissionais);
    } catch (err) {
      console.error('Erro ao carregar profissionais', err);
    }
  }

  // Confirma agendamento
  async confirmarAgendamento(servico: string, profissional: string, data: string, hora: string): Promise<void> {
    if (!servico || !profissional || !data || !hora) {
      alert('Preencha todos os campos!');
      return;
    }

    try {
      const resp = await fetch('/agendamentos/save', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({servico, profissional, data, hora})
      });

      if (resp.ok) {
        alert('Agendamento salvo com sucesso!');
        this.fecharModal();
      } else {
        alert('Erro ao salvar agendamento');
      }
    } catch (err) {
      console.error('Erro ao salvar agendamento', err);
    }
  }

  // Controle de exibição de links conforme login
  async verificarUsuarioLogado(): Promise<void> {
    try {
      const resp = await fetch('/api/usuario-logado');
      const user = await resp.json();

      // Aqui você pode definir variáveis como:
      // this.isCliente = user?.role === 'CLIENTE';
      // this.isAdmin = user?.role === 'ADMIN';
      // E depois usar *ngIf no template para exibir/ocultar links
      console.log('Usuário logado:', user);
    } catch (err) {
      console.error('Erro ao verificar usuário logado', err);
    }
  }
}
