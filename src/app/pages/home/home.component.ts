import { Component, AfterViewInit, HostListener, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthService, UsuarioLogado } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit, OnInit {

  usuario$: Observable<UsuarioLogado | null>;
  isDropdownOpen = false;

  constructor(private authService: AuthService) {
    this.usuario$ = of(null);
  }

  ngOnInit(): void {
    // Pega o usuário do localStorage imediatamente
    const user = this.authService.getUsuarioLogado();
    this.usuario$ = of(user);

    // Atualiza sempre que houver mudança de login/logout
    this.authService.usuarioLogado$.subscribe(u => {
      this.usuario$ = of(u);
    });
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
      if (rect.top < windowHeight - 100) el.classList.add('fade-visible');
    });
  }

  scrollTo(sectionId: string) {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }

  logout() {
    this.authService.logout();
    this.usuario$ = of(null); // Atualiza imediatamente o dropdown
  }

  toggleDropdown(event: Event) {
    event.preventDefault();
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
