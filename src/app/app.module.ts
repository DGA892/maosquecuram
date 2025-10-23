import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { HomeComponent } from './pages/home/home.component';

// Modules
import { AgendaModule } from './pages/adminpage/agenda/agenda.module';
import { ServicosModule } from './pages/adminpage/servicos/servicos.module';
import { ProfissionaisModule } from './pages/adminpage/profissionais/profissionais.module';
import { AdminModule } from './pages/adminpage/admin/admin.module';
import { LogarModule } from './pages/contas/logar/logar.module';
import { RegistrarModule } from './pages/contas/registrar/registrar.module';
import { ProfileModule } from './pages/perfil/profile/profile.module';
import { AppointmentsModule } from './pages/perfil/appointments/appointments.module';
import { FooterModule } from './shared/footer/footer.module';
import { SharedModule } from './shared/shared.module';
import { AgendamentoModule } from './pages/agendamento/agendamento.module';

// Interceptor
import { AuthInterceptor } from './services/auth.interceptor';

// ✅ Registro do locale PT-BR
registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    AgendaModule,
    ServicosModule,
    ProfissionaisModule,
    AdminModule,
    LogarModule,
    RegistrarModule,
    ProfileModule,
    AppointmentsModule,
    FooterModule,
    AgendamentoModule,
    AppRoutingModule // ← mantém por último
  ],
  providers: [
    // ✅ Configura o idioma global da aplicação
    { provide: LOCALE_ID, useValue: 'pt' },
    // ✅ Interceptor de autenticação
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
