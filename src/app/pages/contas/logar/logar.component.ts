import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logar',
  templateUrl: './logar.component.html',
  styleUrls: ['./logar.component.css']
})
export class LogarComponent implements OnInit {

  loginForm!: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
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

    const loginData = this.loginForm.value;

    // URL do backend (ajuste se necessário)
    this.http.post<any>('http://localhost:8080/users/login', loginData).subscribe({
      next: (res) => {
        // Exemplo: salvando informações básicas no localStorage
        localStorage.setItem('usuario', JSON.stringify(res.usuario));
        this.successMessage = res.sucesso || 'Login realizado com sucesso!';
        this.errorMessage = '';

        // redireciona após login bem-sucedido
        setTimeout(() => this.router.navigate(['/profile']), 1500);
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'E-mail ou senha inválidos';
        this.successMessage = '';
      }
    });
  }
}
