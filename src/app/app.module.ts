import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppointmentsComponent } from './pages/perfil/appointments/appointments.component';
import { AdminComponent } from './pages/adminpage/admin/admin.component';
import { AgendaComponent } from './pages/adminpage/agenda/agenda.component';
import { ProfissionaisComponent } from './pages/adminpage/profissionais/profissionais.component';
import { ServicosComponent } from './pages/adminpage/servicos/servicos.component';
import { RegistrarComponent } from './pages/contas/registrar/registrar.component';
import { LogarComponent } from './pages/contas/logar/logar.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AgendaModule } from './pages/adminpage/agenda/agenda.module';
import { ServicosModule } from './pages/adminpage/servicos/servicos.module';
import { ProfissionaisModule } from './pages/adminpage/profissionais/profissionais.module';
import { AdminModule } from './pages/adminpage/admin/admin.module';
import { LogarModule } from './pages/contas/logar/logar.module';
import { RegistrarModule } from './pages/contas/registrar/registrar.module';
import { CommonModule } from '@angular/common';
import { ProfileModule } from './pages/perfil/profile/profile.module';
import { AppointmentsModule } from './pages/perfil/appointments/appointments.module';
import { HeaderComponent } from './layout/header/header.component';
import { FooterModule } from './shared/footer/footer.module';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    HeaderComponent

  ],

  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    AgendaModule,
    ServicosModule,
    ProfissionaisModule,
    AdminModule,
    LogarModule,
    RegistrarModule,
    RouterModule,
    CommonModule,
    ProfileModule,
    AppointmentsModule
  ]
})
export class AppModule {}
