import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Layout / Public pages
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';

// User pages
import { ProfileComponent } from './pages/perfil/profile/profile.component';
import { AppointmentsComponent } from './pages/perfil/appointments/appointments.component';

// Admin pages
import { AdminComponent } from './pages/admin/admin.component';
import { AgendaComponent } from './pages/admin/agenda/agenda.component';
import { ProfissionaisComponent } from './pages/admin/profissionais/profissionais.component';
import { ServicosComponent } from './pages/admin/servicos/servicos.component';

// Auth pages
import { RegistrarComponent } from './pages/auth/registrar/registrar.component';
import { LogarComponent } from './pages/auth/logar/logar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

const routes: Routes = [

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProfileComponent,
    AppointmentsComponent,
    AdminComponent,
    AgendaComponent,
    ProfissionaisComponent,
    ServicosComponent,
    RegistrarComponent,
    LogarComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  exports: [
    RouterModule
  ]
})
export class AppModule { }
