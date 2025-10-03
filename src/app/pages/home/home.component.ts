import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  
  scrollTo(sectionId: string) {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
}

abrirModal() {
  const modal = document.getElementById('agendamentoModal');
  if (modal) modal.style.display = 'block';
}

fecharModal() {
  const modal = document.getElementById('agendamentoModal');
  if (modal) modal.style.display = 'none';
}

  

}
