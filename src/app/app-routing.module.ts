import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './pages/perfil/profile/profile.component';
import { LogarComponent } from './pages/contas/logar/logar.component';
import { RegistrarComponent } from './pages/contas/registrar/registrar.component';
import { ServicosComponent } from './pages/adminpage/servicos/servicos.component';
import { ProfissionaisComponent } from './pages/adminpage/profissionais/profissionais.component';
import { AgendaComponent } from './pages/adminpage/agenda/agenda.component';
import { AppointmentsComponent } from './pages/perfil/appointments/appointments.component';
import { AdminComponent } from './pages/adminpage/admin/admin.component';


  const routes: Routes = [
    { path: 'appointments', component: AppointmentsComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'agenda', component: AgendaComponent },
    { path: 'profissionais', component: ProfissionaisComponent },
    { path: 'servicos', component: ServicosComponent },
    { path: 'registrar', component: RegistrarComponent },
    { path: 'logar', component: LogarComponent },
    { path: 'profile', component: ProfileComponent },
    { path: '', redirectTo: '/logar', pathMatch: 'full' }
  ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


 }
