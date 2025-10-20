import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';

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
import { HomeComponent } from './pages/home/home.component';
import { AgendamentoModule } from './pages/agendamento/agendamento.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor';


@NgModule({

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
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
    AppRoutingModule // ← importa por último, contém todas as rotas
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
