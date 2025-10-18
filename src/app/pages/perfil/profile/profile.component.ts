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
      senha: [''], // ➕ senha adicionada
      numtel: [''], // ✅ renomeado de telefone para numtel, como no backend
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

  /** 🔹 Carrega o usuário pelo ID do localStorage */
  carregarUsuario(id: number): void {
    this.usuariosService.getUsuario(id).subscribe({
      next: (usuario) => {
        this.usuario = usuario;

        // Atualiza o formulário (sem senha)
        this.profileForm.patchValue({
          ...usuario,
          senha: '' // campo deixado em branco
        });
      },
      error: (err) => {
        console.error('Erro ao carregar usuário:', err);
        this.errorMessage = 'Erro ao carregar dados do usuário.';
      }
    });
  }

  /** 🔹 Atualiza as informações do perfil */
  salvarAlteracoes(): void {
    if (!this.usuario) {
      this.errorMessage = 'Usuário não encontrado.';
      return;
    }

    const formData = this.profileForm.getRawValue();

    const dadosAtualizados: Usuario = {
      ...this.usuario,
      ...formData
    };

    // ⚠️ Não envia senha se o campo estiver vazio
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

}
