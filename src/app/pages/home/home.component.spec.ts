import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent]
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('HomeComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    declarations: [HomeComponent]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'maosquecuram'`, () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('maosquecuram');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('maosquecuram app is running!');
  });
  // abre/fecha modal (use seus próprios botões)
const modal = document.getElementById('agendamentoModal');
const fecharModal = document.querySelector('.fechar-modal');

function abrirModal() {
  modal.style.display = 'block';
  carregarProfissionais(); // carrega a lista toda vez que abre
}
CloseModal.onclick = () => modal.style.display = 'none';

// buscar profissionais no back-end
async function carregarProfissionais() {
  try {
    const resp = await fetch('/professionals/api'); // endpoint JSON
    const profissionais = await resp.json();
    const select = document.getElementById('profissional');
    if (select) {
      select.innerHTML = '<option value="">Selecione</option>';
      profissionais.forEach((p: { id: string; nome: string | null; }) => {
        const opt = document.createElement('option');
        opt.value = p.id; // ou p.nome
        opt.textContent = p.nome; // ou `${p.nome} - ${p.especialidade}`
        select.appendChild(opt);
      });
    }
  } catch (err) {
    console.error('Erro ao carregar profissionais', err);
 }
}

// ação do botão Confirmar

const agendarBtn = document.getElementById('agendarBtn');
if (agendarBtn) {
  agendarBtn.addEventListener('click', () => {
    const servico = (document.getElementById('servico') as HTMLInputElement).value;
    const profissional = (document.getElementById('profissional') as HTMLInputElement).value;
    const data = (document.getElementById('data') as HTMLInputElement).value;
    const hora = (document.getElementById('hora') as HTMLInputElement).value;

    if (!servico || !profissional || !data || !hora) {
      alert('Preencha todos os campos!');
      return;
    }

    // Exibir resumo (ou enviar via fetch POST)
    const resumoDiv = document.getElementById('resumo');
    if (resumoDiv) {
      resumoDiv.style.display = 'block';
      resumoDiv.innerHTML = `
        <p><strong>Serviço:</strong> ${servico}</p>
        <p><strong>Profissional:</strong> ${profissional}</p>
        <p><strong>Data:</strong> ${data}</p>
        <p><strong>Horário:</strong> ${hora}</p>
      `;
    }

    // Exemplo de POST para o back-end (descomente/adapte):
    
    fetch('/agendamentos/save', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({servico, profissionalId: profissional, data, hora})
    })
    .then(resp => {
      if (resp.ok) alert('Agendamento salvo com sucesso!');
      else alert('Erro ao salvar agendamento');
    });
    
  });
}



  //<!-- Controle de exibição dos links conforme login -->
    fetch('/api/usuario-logado')
      .then(resp => resp.json())
      .then(user => {
        // Oculta tudo primeiro
        const liPerfil = document.querySelector('#liPerfil');
        if (liPerfil) (liPerfil as HTMLElement).style.display = 'none';
        const liAgendamentos = document.querySelector('#liAgendamentos');
        if (liAgendamentos) (liAgendamentos as HTMLElement).style.display = 'none';
        const liAdmin = document.querySelector('#liAdmin');
        if (liAdmin) (liAdmin as HTMLElement).style.display = 'none';
        const liSair = document.querySelector('#liSair');
        if (liSair) (liSair as HTMLElement).style.display = 'none';

        if(user){
          const liPerfilBlock = document.querySelector('#liPerfil');
          if (liPerfilBlock) (liPerfilBlock as HTMLElement).style.display = 'block';
          const liSairBlock = document.querySelector('#liSair');
          if (liSairBlock) (liSairBlock as HTMLElement).style.display = 'block';

          if(user.role === 'CLIENTE'){
            const liAgendamentosBlock = document.querySelector('#liAgendamentos');
            if (liAgendamentosBlock) (liAgendamentosBlock as HTMLElement).style.display = 'block';
          }
          if(user.role === 'ADMIN'){
            const liAdminBlock = document.querySelector('#liAdmin') as HTMLElement;
            if (liAdminBlock) liAdminBlock.style.display = 'block';
          }
        }
      });
});
