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
    if (this.loginForm.invalid) {
      return;
    }

    const loginData = this.loginForm.value;

    this.http.post<any>('/api/login', loginData).subscribe({
      next: (res) => {
        // Exemplo: salvar token ou dados do usuário no localStorage
        localStorage.setItem('usuario', JSON.stringify(res.user));
        this.router.navigate(['/profile']); // redireciona para perfil
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Erro ao efetuar login';
      }
    });
  }
}
