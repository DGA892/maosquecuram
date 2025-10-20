import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, UsuarioLogado } from '../../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm!: FormGroup;
  usuario!: UsuarioLogado | null;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Inicializa o formulário
    this.profileForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: [''],
      numtel: [''],
      dataNascimento: ['']
    });

    // Carrega usuário logado do AuthService
    const usuarioLogado = this.authService.getUsuarioLogado();
    if (usuarioLogado) {
      this.usuario = usuarioLogado;
      this.profileForm.patchValue({
        ...usuarioLogado,
        senha: ''
      });
    } else {
      this.errorMessage = 'Nenhum usuário logado encontrado.';
    }
  }

  /** 🔹 Salva alterações */
  salvarAlteracoes(): void {
    if (!this.usuario) {
      this.errorMessage = 'Usuário não encontrado.';
      return;
    }

    const formData = this.profileForm.getRawValue();
    const dadosAtualizados: UsuarioLogado = {
      ...this.usuario,
      ...formData
    };

    if (!formData.senha) {
      delete dadosAtualizados.senha;
    }

    // Atualiza no AuthService
    this.authService.atualizarUsuario(dadosAtualizados);
    this.successMessage = 'Perfil atualizado com sucesso!';
    this.errorMessage = '';
    this.usuario = dadosAtualizados;
  }

  /** 🔹 Alterar senha via prompt */
  alterarSenha() {
    const novaSenha = prompt('Digite a nova senha:');
    if (novaSenha && novaSenha.trim() !== '') {
      this.profileForm.patchValue({ senha: novaSenha });
      this.salvarAlteracoes();
      alert('Senha alterada com sucesso!');
      this.profileForm.patchValue({ senha: '' });
    }
  }

  /** 🔹 Habilitar/desabilitar campos */
  toggleEdit(field: string) {
    const control = this.profileForm.get(field);
    if (control?.disabled) {
      control.enable();
    } else {
      control?.disable();
    }
  }

  /** 🔹 Formata data de nascimento enquanto digita (dd/MM/yyyy) */
  formatarDataNascimento(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2);
    if (value.length > 5) value = value.slice(0, 5) + '/' + value.slice(5, 9);
    event.target.value = value;
    this.profileForm.get('dataNascimento')?.setValue(value, { emitEvent: false });
  }

}
