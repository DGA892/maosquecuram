import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    declarations: [AppComponent]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'maosquecuram'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('maosquecuram');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
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
fecharModal.onclick = () => modal.style.display = 'none';

// buscar profissionais no back-end
async function carregarProfissionais() {
  try {
    const resp = await fetch('/professionals/api'); // endpoint JSON
    const profissionais = await resp.json();
    const select = document.getElementById('profissional');
    select.innerHTML = '<option value="">Selecione</option>';
    profissionais.forEach(p => {
      const opt = document.createElement('option');
      opt.value = p.id; // ou p.nome
      opt.textContent = p.nome; // ou `${p.nome} - ${p.especialidade}`
      select.appendChild(opt);
    });
  } catch (err) {
    console.error('Erro ao carregar profissionais', err);
 }
}

// ação do botão Confirmar
document.getElementById('agendarBtn').addEventListener('click', () => {
  const servico = document.getElementById('servico').value;
  const profissional = document.getElementById('profissional').value;
  const data = document.getElementById('data').value;
  const hora = document.getElementById('hora').value;

  if (!servico || !profissional || !data || !hora) {
    alert('Preencha todos os campos!');
    return;
  }

  // Exibir resumo (ou enviar via fetch POST)
  const resumoDiv = document.getElementById('resumo');
  resumoDiv.style.display = 'block';
  resumoDiv.innerHTML = `
    <p><strong>Serviço:</strong> ${servico}</p>
    <p><strong>Profissional:</strong> ${profissional}</p>
    <p><strong>Data:</strong> ${data}</p>
    <p><strong>Horário:</strong> ${hora}</p>
  `;

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
</script>



  <!-- Controle de exibição dos links conforme login -->
<script>
    fetch('/api/usuario-logado')
      .then(resp => resp.json())
      .then(user => {
        // Oculta tudo primeiro
        document.querySelector('#liPerfil').style.display = 'none';
        document.querySelector('#liAgendamentos').style.display = 'none';
        document.querySelector('#liAdmin').style.display = 'none';
        document.querySelector('#liSair').style.display = 'none';

        if(user){
          document.querySelector('#liPerfil').style.display = 'block';
          document.querySelector('#liSair').style.display = 'block';

          if(user.role === 'CLIENTE'){
            document.querySelector('#liAgendamentos').style.display = 'block';
          }
          if(user.role === 'ADMIN'){
            document.querySelector('#liAdmin').style.display = 'block';
          }
        }
      });
});
