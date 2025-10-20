import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, UsuarioLogado } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logar',
  templateUrl: './logar.component.html',
  styleUrls: ['./logar.component.css']
})
export class LogarComponent implements OnInit {

  loginForm!: FormGroup;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    const { email, senha } = this.loginForm.value;

    this.authService.login(email, senha).subscribe({
      next: (usuario: UsuarioLogado) => {
        this.successMessage = 'Login realizado com sucesso!';
        this.errorMessage = '';

        // Redireciona após login
        setTimeout(() => this.router.navigate(['/home']), 1000);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err.error?.error || 'E-mail ou senha inválidos';
        this.successMessage = '';
      }
    });
  }
}
