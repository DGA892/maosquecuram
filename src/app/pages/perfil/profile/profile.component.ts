import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService, Usuario } from '../../../services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm!: FormGroup;
  usuario!: Usuario | null;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Inicializa o formulário
    this.profileForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: [''],
      numtel: [''],
      dataNascimento: [''],
      foto: ['']
    });

    // Recupera usuário logado do localStorage
    const usuarioLocal = localStorage.getItem('usuario');
    if (usuarioLocal) {
      const usuarioData = JSON.parse(usuarioLocal);
      this.carregarUsuario(usuarioData.id);
    } else {
      this.errorMessage = 'Nenhum usuário logado encontrado.';
    }
  }

  /** 🔹 Carrega o usuário e formata a data de nascimento */
  carregarUsuario(id: number): void {
    this.usuariosService.getUsuario(id).subscribe({
      next: (usuario) => {
        this.usuario = usuario;

        // Formata data de nascimento como dd/MM/yyyy
        const dataFormatada = usuario.dataNascimento
          ? new Date(usuario.dataNascimento).toLocaleDateString('pt-BR')
          : '';

        this.profileForm.patchValue({
          ...usuario,
          senha: '',
          dataNascimento: dataFormatada
        });
      },
      error: (err) => {
        console.error('Erro ao carregar usuário:', err);
        this.errorMessage = 'Erro ao carregar dados do usuário.';
      }
    });
  }

  /* Salva alterações e converte a data para ISO */
  salvarAlteracoes(): void {
    if (!this.usuario) {
      this.errorMessage = 'Usuário não encontrado.';
      return;
    }

    const formData = this.profileForm.getRawValue();

    const dataNascimentoISO = formData.dataNascimento
      ? new Date(formData.dataNascimento.split('/').reverse().join('-')).toISOString()
      : null;

    const dadosAtualizados: Usuario = {
      ...this.usuario,
      ...formData,
      dataNascimento: dataNascimentoISO || undefined
    };

    if (!formData.senha) {
      delete dadosAtualizados.senha;
    }

    this.usuariosService.updateUsuario(this.usuario.id!, dadosAtualizados).subscribe({
      next: (res) => {
        this.successMessage = 'Perfil atualizado com sucesso!';
        this.errorMessage = '';
        this.usuario = res;
        localStorage.setItem('usuario', JSON.stringify(res));
      },
      error: (err) => {
        console.error('Erro ao atualizar usuário:', err);
        this.errorMessage = 'Erro ao atualizar perfil.';
        this.successMessage = '';
      }
    });
  }

  /** 🔹 Alterar senha via prompt */
  alterarSenha() {
    const novaSenha = prompt('Digite a nova senha:');
    if (novaSenha !== null && novaSenha.trim() !== '') {
      this.profileForm.patchValue({ senha: novaSenha });
      this.salvarAlteracoes();
      alert('Senha alterada com sucesso!');
      this.profileForm.patchValue({ senha: '' });
    }
  }

  /** 🔹 Ao trocar a foto */
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileForm.patchValue({ foto: e.target.result });
        if (this.usuario) this.usuario.foto = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  /** 🔹 Abrir seletor de foto */
  triggerUpload() {
    const input = document.getElementById('uploadPhoto') as HTMLInputElement;
    input?.click();
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
