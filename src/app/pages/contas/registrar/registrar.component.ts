import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  registrarForm!: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registrarForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      numtel: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      senha: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  onSubmit(): void {
    if (this.registrarForm.invalid) {
      return;
    }

    const formData = this.registrarForm.value;

    this.http.post<any>('/users/cadastrar', formData).subscribe({
      next: (res) => {
        this.successMessage = res.sucesso || 'Conta criada com sucesso!';
        this.errorMessage = '';
        this.registrarForm.reset();
        this.router.navigate(['/logar']); // redireciona para login
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Erro ao registrar';
        this.successMessage = '';
      }
    });
  }
}
