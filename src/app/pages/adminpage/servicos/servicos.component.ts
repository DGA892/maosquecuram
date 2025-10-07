import { Component, OnInit } from '@angular/core';
import { ServicosService, Servico } from '../../../services/servicos.service';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.css']
})
export class ServicosComponent implements OnInit {
  servicos: Servico[] = [];
  novoServico: Servico = { nome: '', descricao: '' };
  editando: boolean = false;
  servicoSelecionado?: Servico;

  constructor(private servicosService: ServicosService) { }

  ngOnInit(): void {
    this.carregarServicos();
  }

  carregarServicos(): void {
    this.servicosService.getAll().subscribe({
      next: (data) => this.servicos = data,
      error: (err) => console.error('Erro ao carregar serviços', err)
    });
  }

  salvar(): void {
    if (this.editando && this.servicoSelecionado) {
      this.servicosService.update(this.servicoSelecionado.id!, this.novoServico).subscribe({
        next: () => {
          this.cancelarEdicao();
          this.carregarServicos();
        },
        error: (err) => console.error('Erro ao atualizar serviço', err)
      });
    } else {
      this.servicosService.save(this.novoServico).subscribe({
        next: () => {
          this.novoServico = { nome: '', descricao: '' };
          this.carregarServicos();
        },
        error: (err) => console.error('Erro ao salvar serviço', err)
      });
    }
  }

  editar(servico: Servico): void {
    this.editando = true;
    this.servicoSelecionado = servico;
    this.novoServico = { ...servico };
  }

  cancelarEdicao(): void {
    this.editando = false;
    this.novoServico = { nome: '', descricao: '' };
    this.servicoSelecionado = undefined;
  }

  excluir(id: number): void {
    if (confirm('Tem certeza que deseja excluir este serviço?')) {
      this.servicosService.delete(id).subscribe({
        next: () => this.carregarServicos(),
        error: (err) => console.error('Erro ao deletar serviço', err)
      });
    }
  }
  modalAberto: boolean = false;

  abrirModal() { this.modalAberto = true; }
  fecharModal() {
    this.modalAberto = false;
    this.cancelarEdicao();
  }

}
