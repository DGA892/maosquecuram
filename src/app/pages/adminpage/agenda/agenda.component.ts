import { Component, OnInit } from '@angular/core';
import { AgendamentoService, Agendamento } from '../../../services/agendamento.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  currentDate: Date = new Date();
  weekdays: string[] = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  daysInMonth: number[] = [];
  selectedDate: Date | null = null;
  daySchedule: { hour: string, agendamento?: Agendamento }[] = [];
  hours: string[] = ["08:00", "09:00", "10:00", "11:00", "12:00"];
  feriados: Set<string> = new Set();
  holidayMode: boolean = false;

  showModal: boolean = false;
  selectedHour: string | null = null;
  clientes: string[] = [];
  profissionais: string[] = [];
  servicos: string[] = ['Massagem', 'Acupuntura', 'Reflexologia'];

  clienteSelecionado: string = '';
  profissionalSelecionado: string = '';
  servicoSelecionado: string = '';

  constructor(private agendamentoService: AgendamentoService) {}

  ngOnInit() {
    this.generateDays();
    this.markSundaysAsHolidays();
    this.loadClientes();
    this.loadProfissionais();
  }

  generateDays() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const daysCount = new Date(year, month + 1, 0).getDate();
    this.daysInMonth = Array.from({ length: daysCount }, (_, i) => i + 1);
    this.selectedDate = null;
    this.daySchedule = [];
  }

  formatDate(date: Date): string {
    return formatDate(date, 'yyyy-MM-dd', 'pt');
  }

  getWeekday(day: number): string {
    const date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day);
    return this.weekdays[date.getDay()];
  }

  markSundaysAsHolidays() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      if (date.getDay() === 0) this.feriados.add(this.formatDate(date));
    }
  }

  isHoliday(day: number): boolean {
    const date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day);
    return this.feriados.has(this.formatDate(date));
  }

  prevMonth() {
    this.currentDate = new Date(this.currentDate.setMonth(this.currentDate.getMonth() - 1));
    this.generateDays();
    this.markSundaysAsHolidays();
  }

  nextMonth() {
    this.currentDate = new Date(this.currentDate.setMonth(this.currentDate.getMonth() + 1));
    this.generateDays();
    this.markSundaysAsHolidays();
  }

  toggleHolidayMode() {
    this.holidayMode = !this.holidayMode;
  }

  markHoliday(day: number) {
    const dateKey = this.formatDate(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day));
    if (this.feriados.has(dateKey)) this.feriados.delete(dateKey);
    else this.feriados.add(dateKey);
  }

  selectDay(day: number) {
    const date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day);
    const dateKey = this.formatDate(date);

    if (this.holidayMode) {
      this.markHoliday(day);
      return;
    }

    if (this.feriados.has(dateKey)) {
      alert("Dia marcado como feriado. Não é possível agendar.");
      return;
    }

    this.selectedDate = date;
    this.loadDaySchedule(dateKey);
  }

  loadDaySchedule(dateKey: string) {
    this.agendamentoService.getAgendamentosDoDia(dateKey).subscribe({
      next: res => {
        this.daySchedule = this.hours.map(hour => ({
          hour,
          agendamento: res[hour]
        }));
      },
      error: err => {
        console.error('Erro ao carregar agendamentos', err);
        this.daySchedule = this.hours.map(hour => ({ hour }));
      }
    });
  }

  openModal(hour: string) {
    if (!this.selectedDate) return;
    const slot = this.daySchedule.find(s => s.hour === hour);

    if (slot?.agendamento) {
      alert("Horário já ocupado!");
      return;
    }

    this.selectedHour = hour;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedHour = null;
  }

  confirmSchedule() {
    if (!this.selectedDate || !this.selectedHour) return;
    const dateKey = this.formatDate(this.selectedDate);

    const novoAgendamento: Agendamento = {
      servico: this.servicoSelecionado,
      profissional: this.profissionalSelecionado,
      user: this.clienteSelecionado,
      data: dateKey,
      hora: this.selectedHour.length === 5 ? `${this.selectedHour}:00` : this.selectedHour
    };

    this.agendamentoService.criarAgendamento(novoAgendamento).subscribe({
      next: () => {
        alert('Agendamento criado com sucesso!');
        this.loadDaySchedule(dateKey);
        this.closeModal();
      },
      error: err => {
        console.error(err);
        alert('Erro ao criar agendamento.');
      }
    });
  }

  loadClientes() {
    this.clientes = ['Cliente 1', 'Cliente 2', 'Cliente 3'];
    this.clienteSelecionado = this.clientes[0];
  }

  loadProfissionais() {
    this.profissionais = ['Ana', 'João', 'Maria'];
    this.profissionalSelecionado = this.profissionais[0];
  }

  hasAgendamento(day: number): boolean {
    const date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day);
    const dateKey = this.formatDate(date);
    return this.daySchedule.some(slot => slot.agendamento && slot.agendamento.data === dateKey);
  }
}
