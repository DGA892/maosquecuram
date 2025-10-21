import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthLocalService } from 'src/app/services/auth-local.service';

@Component({
  selector: 'app-logar',
  templateUrl: './logar.component.html',
  styleUrls: ['./logar.component.css']
})
export class LogarComponent {
  email = '';
  senha = '';
  errorMessage = '';

  constructor(private authLocal: AuthLocalService, private router: Router) {}

  login() {
    const sucesso = this.authLocal.login(this.email, this.senha);

    if (sucesso) {
      this.errorMessage = '';
      alert('Login realizado com sucesso!');
      this.router.navigate(['/profile']); // redireciona para perfil
    } else {
      this.errorMessage = 'E-mail ou senha inválidos.';
    }
  }
}
