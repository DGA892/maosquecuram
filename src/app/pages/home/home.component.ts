import { Component, AfterViewInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  
  scrollTo(sectionId: string) {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
}


ngAfterViewInit(): void {
    this.ativarAnimacoes();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.ativarAnimacoes();
  }

  private ativarAnimacoes(): void {
    const elementos = document.querySelectorAll('[data-fade]');
    const windowHeight = window.innerHeight;

    elementos.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < windowHeight - 100) {
        el.classList.add('fade-visible');
      }
    });
  }

  abrirModal(): void {
    const modal = document.getElementById('agendamentoModal');
    if (modal) {
      modal.style.display = 'block';
      this.carregarProfissionais();
    }
  }

  fecharModal(): void {
    const modal = document.getElementById('agendamentoModal');
    if (modal) modal.style.display = 'none';
  }

  async carregarProfissionais(): Promise<void> {
    try {
      const resp = await fetch('/professionals/api');
      if (!resp.ok) throw new Error('Erro ao buscar profissionais');
      const profissionais = await resp.json();

      const select = document.getElementById('profissional') as HTMLSelectElement;
      if (!select) return;

      select.innerHTML = '<option value="">Selecione</option>';
      profissionais.forEach((p: any) => {
        const opt = document.createElement('option');
        opt.value = p.id;
        opt.textContent = p.nome;
        select.appendChild(opt);
      });
    } catch (err) {
      console.error('Erro ao carregar profissionais:', err);
    }
  }

  confirmarAgendamento(): void {
    const servico = (document.getElementById('servico') as HTMLSelectElement)?.value;
    const profissional = (document.getElementById('profissional') as HTMLSelectElement)?.value;
    const data = (document.getElementById('data') as HTMLInputElement)?.value;
    const hora = (document.getElementById('hora') as HTMLSelectElement)?.value;

    if (!servico || !profissional || !data || !hora) {
      alert('Preencha todos os campos!');
      return;
    }

    const resumoDiv = document.getElementById('resumo');
    if (resumoDiv) {
      resumoDiv.style.display = 'block';
      resumoDiv.innerHTML = `
        <p><strong>Serviço:</strong> ${servico}</p>
        <p><strong>Profissional:</strong> ${profissional}</p>
        <p><strong>Data:</strong> ${data}</p>
        <p><strong>Horário:</strong> ${hora}</p>
      `;
    }

    fetch('/agendamentos/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ servico, profissionalId: profissional, data, hora })
    })
      .then(resp => {
        if (resp.ok) {
          alert('Agendamento salvo com sucesso!');
          this.fecharModal();
        } else {
          alert('Erro ao salvar agendamento.');
        }
      })
      .catch(() => alert('Erro de conexão com o servidor.'));
  }

  

}
