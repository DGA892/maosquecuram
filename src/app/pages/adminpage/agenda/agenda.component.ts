import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Agendamento {
  nome: string;
  email: string;
  profissional: string;
}

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

  // Modal
  showModal: boolean = false;
  selectedHour: string | null = null;
  clientes: string[] = [];
  profissionais: string[] = [];
  servicos: string[] = ['Massagem', 'Acupuntura', 'Reflexologia'];

  clienteSelecionado: string = '';
  profissionalSelecionado: string = '';
  servicoSelecionado: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.generateDays();
    this.markSundaysAsHolidays();
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
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`; // formato ISO para fácil comparação
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
      if (date.getDay() === 0) { // domingo
        this.feriados.add(this.formatDate(date));
      }
    }
  }

  prevMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.generateDays();
    this.markSundaysAsHolidays();
  }

  nextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.generateDays();
    this.markSundaysAsHolidays();
  }

  toggleHolidayMode() {
    this.holidayMode = !this.holidayMode;
  }

  selectDay(day: number) {
    const date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day);
    const dateKey = this.formatDate(date);

    if (this.holidayMode) {
      if (this.feriados.has(dateKey)) this.feriados.delete(dateKey);
      else this.feriados.add(dateKey);
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
    this.http.get<{ [hour: string]: Agendamento }>(`/agendamentos/day/${dateKey}`)
      .subscribe(res => {
        this.daySchedule = this.hours.map(hour => ({
          hour,
          agendamento: res[hour]
        }));
      }, err => {
        console.error('Erro ao carregar agendamentos', err);
        this.daySchedule = this.hours.map(hour => ({ hour }));
      });
  }

  markHoliday(day: number) {
    const dateKey = this.formatDate( new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day));
    if (this.feriados.has(dateKey)) {
      this.feriados.delete(dateKey);
    } else {
      this.feriados.add(dateKey);
    }
  }


  markSlot(hour: string) {
    if (!this.selectedDate) return;
    const dateKey = this.formatDate(this.selectedDate);

    const slot = this.daySchedule.find(s => s.hour === hour);
    if (!slot) return;

    if (slot.agendamento) {
      alert("Horário já ocupado!");
      return;
    }

    const novoAgendamento = {
      servico: this.servicoSelecionado,
      profissional: this.profissionalSelecionado,
      user: this.clienteSelecionado,
      data: dateKey,
      hora: hour
    };

    this.http.post('/agendamentos/cadastrar', novoAgendamento)
      .subscribe(() => {
        alert('Agendamento criado com sucesso!');
        this.loadDaySchedule(dateKey);
      }, err => {
        console.error('Erro ao criar agendamento', err);
        alert('Erro ao criar agendamento.');
      });
  }

  // Modal
  openModal(hour: string) {
    if (!this.selectedDate) return;
    const slot = this.daySchedule.find(s => s.hour === hour);
    if (!slot || slot.agendamento) {
      alert("Horário já ocupado!");
      return;
    }

    this.selectedHour = hour;
    this.showModal = true;

    this.clientes = ['Cliente 1', 'Cliente 2', 'Cliente 3'];
    this.profissionais = ['Ana', 'João', 'Maria'];
    this.servicoSelecionado = this.servicos[0];
    this.clienteSelecionado = this.clientes[0];
    this.profissionalSelecionado = this.profissionais[0];
  }

  closeModal() {
    this.showModal = false;
    this.selectedHour = null;
  }

  confirmSchedule() {
    if (!this.selectedDate || !this.selectedHour) return;
    const dateKey = this.formatDate(this.selectedDate);

    const novoAgendamento = {
      servico: this.servicoSelecionado,
      profissional: this.profissionalSelecionado,
      user: this.clienteSelecionado,
      data: dateKey,
      hora: this.selectedHour
    };

    this.http.post('/agendamentos/cadastrar', novoAgendamento)
      .subscribe(() => {
        alert('Agendamento criado com sucesso!');
        this.loadDaySchedule(dateKey);
        this.closeModal();
      }, err => {
        console.error(err);
        alert('Erro ao criar agendamento.');
      });
  }

  isHoliday(day: number): boolean {
    const date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day);
    return this.feriados.has(this.formatDate(date));
  }
}
