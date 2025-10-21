import { Injectable } from '@angular/core';

export interface UsuarioLocal {
  email: string;
  senha: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthLocalService {

  private readonly STORAGE_KEY = 'usuarioLocal';

  constructor() {}

  /** 🔹 Faz login simples com validação local */
  login(email: string, senha: string): boolean {
    // 🔸 Exemplo fixo de credenciais válidas (pode ser alterado)
    const emailValido = 'teste@exemplo.com';
    const senhaValida = '123456';

    if (email === emailValido && senha === senhaValida) {
      const usuario: UsuarioLocal = { email, senha };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(usuario));
      return true;
    }

    return false;
  }

  /** 🔹 Retorna se há usuário logado */
  estaLogado(): boolean {
    return !!localStorage.getItem(this.STORAGE_KEY);
  }

  /** 🔹 Retorna o usuário atual */
  getUsuario(): UsuarioLocal | null {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) as UsuarioLocal : null;
  }

  /** 🔹 Faz logout (remove do localStorage) */
  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
