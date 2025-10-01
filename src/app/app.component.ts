import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'maosquecuram';

  ngAfterViewInit() {
    // Carregar scripts adicionais após a inicialização do componente
    const script = document.createElement('script');
    script.src = 'assets/js/main.js'; // Caminho para o seu arquivo JS
    script.async = true;
    document.body.appendChild(script);
  }
}
