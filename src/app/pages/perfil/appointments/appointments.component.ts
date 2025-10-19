import { Component, OnInit } from '@angular/core';
import { Agendamento, AgendamentoService } from '../../../services/agendamento.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  agendamentos: Agendamento[] = [];
  currentIndex: number | null = null;
  nomeUsuarioLogado = '';

  // Campos do modal
  newDate = '';
  newTime = '';
  modalWarning = false;
  editModalOpen = false;
  cancelModalOpen = false;

  constructor(private agendamentoService: AgendamentoService) {}

  ngOnInit(): void {
    this.nomeUsuarioLogado = localStorage.getItem('usuarioNome') || 'Usuário Padrão';
    this.loadAgendamentos();
  }

  loadAgendamentos(): void {
    this.agendamentoService.getAgendamentos().subscribe({
      next: (res) => {
        this.agendamentos = res.filter(a => a.user === this.nomeUsuarioLogado);
      },
      error: (err) => console.error('Erro ao carregar agendamentos:', err)
    });
  }

  statusBadge(status: string) {
    switch (status) {
      case 'Confirmado': return 'badge bg-success';
      case 'Pendente': return 'badge bg-warning text-dark';
      case 'Concluído': return 'badge bg-secondary';
      default: return '';
    }
  }

  // Abrir modal Remarcar
openEditModal(index: number) {
  this.currentIndex = index;
  const ag = this.agendamentos[index];
  this.newDate = ag.data;
  this.newTime = ag.hora;

  // Verifica se é possível remarcar (24h de antecedência)
  const appointmentDateTime = new Date(`${ag.data}T${ag.hora}`);
  const now = new Date();
  const hoursDiff = (appointmentDateTime.getTime() - now.getTime()) / (1000 * 60 * 60);
  this.modalWarning = hoursDiff < 24;

  this.editModalOpen = true;
}

// Salvar alterações
saveChanges() {
  if (this.currentIndex === null) return;

  const ag = this.agendamentos[this.currentIndex];
  const updatedAg: Agendamento = {
    ...ag,
    data: this.newDate,
    hora: this.newTime.length === 5 ? `${this.newTime}:00` : this.newTime // garante HH:mm:ss
  };

  if (this.modalWarning) {
    alert('Só é possível remarcar com mais de 24h de antecedência.');
    return;
  }

  this.agendamentoService.atualizarAgendamento(ag.id!, updatedAg).subscribe({
    next: () => {
      // Atualiza lista local e fecha modal
      this.agendamentos[this.currentIndex!] = updatedAg;
      this.editModalOpen = false;
      this.currentIndex = null;
    },
    error: (err) => {
      console.error('Erro ao atualizar agendamento:', err);
      alert('Erro ao atualizar agendamento. Tente novamente.');
    }
  });
}

// Fechar modal
closeEditModal() {
  this.editModalOpen = false;
  this.currentIndex = null;
}

  // Abrir modal Cancelar
openCancelModal(index: number) {
    this.currentIndex = index;
    this.cancelModalOpen = true;
  }

  cancelAppointment() {
    if (this.currentIndex === null) return;
    const ag = this.agendamentos[this.currentIndex];

    this.agendamentoService.deletarAgendamento(ag.id!).subscribe({
      next: () => {
        this.agendamentos.splice(this.currentIndex!, 1);
        this.cancelModalOpen = false;
      },
      error: (err) => console.error('Erro ao cancelar agendamento:', err)
    });
  }

  closeCancelModal() {
    this.cancelModalOpen = false;
  }

  isEditable(ag: Agendamento) {
    const appointmentDateTime = new Date(`${ag.data}T${ag.hora}`);
    const now = new Date();
    const hoursDiff = (appointmentDateTime.getTime() - now.getTime()) / (1000 * 60 * 60);
    return hoursDiff >= 24;
  }
}
