import { Component, AfterViewInit, OnInit } from '@angular/core';
import { AuthService, UsuarioLogado } from './services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'maosquecuram';
  
  // Observable do usuário logado
  usuario$: Observable<UsuarioLogado | null>;

  // Campos individuais do usuário
  usuarioId: number | null = null;
  usuarioNome: string | null = null;
  usuarioEmail: string | null = null;
  usuarioNumtel: string | null = null;
  usuarioRole: string | null = null;

  isDropdownOpen = false;

  constructor(private authService: AuthService) {
    this.usuario$ = this.authService.usuarioLogado$;
  }

  ngOnInit(): void {
    // Atualiza campos individuais sempre que o usuário logado muda
    this.usuario$.subscribe(user => {
      if (user) {
        this.usuarioId = user.id;
        this.usuarioNome = user.nome;
        this.usuarioEmail = user.email;
        this.usuarioNumtel = user.numtel;
        this.usuarioRole = user.role;
      } else {
        this.usuarioId = null;
        this.usuarioNome = null;
        this.usuarioEmail = null;
        this.usuarioNumtel = null;
        this.usuarioRole = null;
      }
    });
  }

  ngAfterViewInit(): void {
    const script = document.createElement('script');
    script.src = 'assets/js/main.js';
    script.async = true;
    document.body.appendChild(script);
  }

  logout() {
    this.authService.logout();
    this.isDropdownOpen = false;
  }

  toggleDropdown(event: Event) {
    event.preventDefault();
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
