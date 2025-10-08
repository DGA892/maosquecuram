import { Component, OnInit } from '@angular/core';
import { ProfissionalService, Professional } from '../../../services/profissional.service';

@Component({
  selector: 'app-profissionais',
  templateUrl: './profissionais.component.html',
  styleUrls: ['./profissionais.component.css']
})
export class ProfissionaisComponent implements OnInit {

  profissionais: Professional[] = [];
  profissionalSelecionado: Professional = { nome: '', email: '', cpf: '', numtel: '', senha: '' };

  modalAberto = false;
  editando = false;

  constructor(private profissionalService: ProfissionalService) {}

  ngOnInit(): void {
    this.carregarProfissionais();
  }

  /** Carrega todos os profissionais */
  carregarProfissionais(): void {
    this.profissionalService.getProfissionais().subscribe({
      next: (dados) => this.profissionais = dados,
      error: (err) => console.error('Erro ao carregar profissionais:', err)
    });
  }

  /** Abre o modal para novo profissional */
  abrirModalNovo(): void {
    this.editando = false;
    this.profissionalSelecionado = { nome: '', email: '', cpf: '', numtel: '', senha: '' };
    this.modalAberto = true;
  }

  /** Abre o modal para editar profissional existente */
  abrirModalEditar(profissional: Professional): void {
    this.editando = true;
    this.profissionalSelecionado = { ...profissional };
    this.modalAberto = true;
  }

  /** Fecha o modal */
  fecharModal(): void {
    this.modalAberto = false;
  }

  /** Salva (cria ou atualiza) o profissional */
  salvarProfissional(): void {
    if (this.editando && this.profissionalSelecionado.id) {
      this.profissionalService.updateProfissional(this.profissionalSelecionado.id, this.profissionalSelecionado)
        .subscribe({
          next: () => {
            this.carregarProfissionais();
            this.fecharModal();
          },
          error: (err) => console.error('Erro ao atualizar profissional:', err)
        });
    } else {
      this.profissionalService.addProfissional(this.profissionalSelecionado)
        .subscribe({
          next: () => {
            this.carregarProfissionais();
            this.fecharModal();
          },
          error: (err) => console.error('Erro ao adicionar profissional:', err)
        });
    }
  }

  /** Exclui profissional */
  excluirProfissional(id?: number): void {
    if (!id) return;
    if (confirm('Deseja realmente excluir este profissional?')) {
      this.profissionalService.deleteProfissional(id).subscribe({
        next: () => this.carregarProfissionais(),
        error: (err) => console.error('Erro ao excluir profissional:', err)
      });
    }
  }
}
