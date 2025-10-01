package com.maosquecuram.crud.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.maosquecuram.crud.entities.User;
import com.maosquecuram.crud.repositories.UserRepository;

import jakarta.servlet.http.HttpSession;

//Indica que esta classe é um controlador Spring MVC
@Controller
public class SessionController {
//Injeta automaticamente o repositório de usuários (Spring cuida da instância)
@Autowired
private UserRepository userRepository;
//==========================================================
//MÉTODO: Exibir Página de Login
//==========================================================
//Mapeia requisições GET para a URL "/login"
@GetMapping("/login")
public String loginPage() {
  // Retorna o nome do template Thymeleaf (login.html)
  // Arquivo deve estar em: src/main/resources/templates/login.html
  return "login";
}
//==========================================================
//MÉTODO: Processar Tentativa de Login
//==========================================================
//Mapeia requisições POST para a URL "/login"
@PostMapping("/login")
public String login(
      // @RequestParam: Captura parâmetros do formulário (name="email")
      @RequestParam String email,
      // @RequestParam: Captura parâmetros do formulário (name="senha")
      @RequestParam String senha,
      // HttpSession: Objeto que gerencia a sessão do usuário
      HttpSession session) {
 
  // Busca usuário no banco pelo email
  // orElse(null): Retorna null se não encontrar o usuário
  User user = userRepository.findByEmail(email)
      .orElse(null);
 
  // Verifica se usuário existe E se a senha confere
  if (user != null && user.getSenha().equals(senha)) {
      // Armazena o usuário logado na sessão
      // "userLogged" é a chave para acessar este objeto depois
      session.setAttribute("userLogged", user);
     
      // Redireciona para a página de produtos após login bem-sucedido
      return "redirect:/index";
  }
 
  // Se login falhar, redireciona de volta para login com parâmetro de erro
  // "?error=true" aparecerá na URL: http://localhost:8080/login?error=true
  return "redirect:/login?error=true";
}
//==========================================================
//MÉTODO: Processar Logout
//==========================================================
//Mapeia requisições GET para a URL "/logout"
@GetMapping("/logout")
public String logout(HttpSession session) {
  // session.invalidate(): Destrói completamente a sessão do usuário
  // - Remove todos os atributos (incluindo "userLogged")
  // - Invalida o cookie de sessão no navegador
  session.invalidate();
 
  // Redireciona para a página de login com parâmetro de logout
  // "?logout=true" aparecerá na URL: http://localhost:8080/login?logout=true
  return "redirect:/login?logout=true";
}
}



