import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule], // necessário para routerLink e roteamento
      declarations: [HomeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // Exemplo de teste de renderização simples
  it('should render the main container', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.home-container')).toBeTruthy();
  });

  // Aqui você pode adicionar mais testes específicos do componente,
  // como verificar se botões existem ou se eventos disparam corretamente
  
  

});
