import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Pages
import { ProfileComponent } from './pages/perfil/profile/profile.component';
import { AppointmentsComponent } from './pages/perfil/appointments/appointments.component';
import { AdminComponent } from './pages/adminpage/admin/admin.component';
import { AgendaComponent } from './pages/adminpage/agenda/agenda.component';
import { ProfissionaisComponent } from './pages/adminpage/profissionais/profissionais.component';
import { ServicosComponent } from './pages/adminpage/servicos/servicos.component';
import { RegistrarComponent } from './pages/contas/registrar/registrar.component';
import { LogarComponent } from './pages/contas/logar/logar.component';

const routes: Routes = [
  { path: 'logar', component: LogarComponent },
  { path: 'registrar', component: RegistrarComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'appointments', component: AppointmentsComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'agenda', component: AgendaComponent },
  { path: 'profissionais', component: ProfissionaisComponent },
  { path: 'servicos', component: ServicosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
