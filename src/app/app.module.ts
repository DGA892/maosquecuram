import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import { AppointmentsComponent } from './pages/perfil/appointments/appointments.component';
import { AdminComponent } from './pages/adminpage/admin/admin.component';
import { AgendaComponent } from './pages/adminpage/agenda/agenda.component';
import { ProfissionaisComponent } from './pages/adminpage/profissionais/profissionais.component';
import { ServicosComponent } from './pages/adminpage/servicos/servicos.component';
import { RegistrarComponent } from './pages/contas/registrar/registrar.component';
import { LogarComponent } from './pages/contas/logar/logar.component';


///other imports
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { ProfileComponent } from './pages/perfil/profile/profile.component';
import { AgendaModule } from './pages/adminpage/agenda/agenda.module';
import { ServicosModule } from './pages/adminpage/servicos/servicos.module';
import { ProfissionaisModule } from './pages/adminpage/profissionais/profissionais.module';
import { AdminModule } from './pages/adminpage/admin/admin.module';
import { LogarModule } from './pages/contas/logar/logar.module';
import { RegistrarModule } from './pages/contas/registrar/registrar.module';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppointmentsComponent,
    AdminComponent,
    AgendaComponent,
    ProfissionaisComponent,
    ServicosComponent,
    RegistrarComponent,
    LogarComponent,
    ProfileComponent,
  ],

  imports: [
    RouterModule.forRoot(routes),
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
  ],
})
export class AppModule {}
