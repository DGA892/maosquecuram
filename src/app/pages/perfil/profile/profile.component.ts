import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsuariosService } from '../../../services/usuarios.service';
import { Usuario } from '../../../services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  usuario!: Usuario;
  userId = 1; // <-- substitua pelo ID real do usuário logado (ex: vindo do AuthService)

  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService
  ) { }

  ngOnInit(): void {
    const userId = 1; // ou pegue do localStorage, token, etc.
    this.usuariosService.getUsuario(userId).subscribe({
      next: (usuario) => {
        this.usuario = usuario;
        this.profileForm.patchValue(usuario);
      },
      error: () => {
        console.error('Erro ao carregar dados do usuário');
      }
    });
  }


  carregarUsuario(): void {
    this.usuariosService.getUsuario(this.userId).subscribe({
      next: (data) => {
        this.usuario = data;
        this.profileForm.patchValue(data);
      },
      error: (err) => {
        console.error('Erro ao carregar usuário:', err);
      }
    });
  }

  salvarAlteracoes(): void {
    const dadosAtualizados: Usuario = this.profileForm.value;

    this.usuariosService.updateUsuario(this.userId, dadosAtualizados).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Perfil atualizado com sucesso!',
          showConfirmButton: false,
          timer: 1800
        });
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao atualizar perfil',
          text: err.error?.message || 'Tente novamente mais tarde.'
        });
      }
    });
  }

}
