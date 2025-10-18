import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendaComponent } from './agenda.component';
import { SidebarModule } from '../admin/shared/sidebar/sidebar.module';
import { FormsModule } from '@angular/forms';
import { FooterModule } from 'src/app/shared/footer/footer.module';

@NgModule({
  declarations: [AgendaComponent],
  imports: [
    CommonModule,
    SidebarModule,
    FormsModule,
    FooterModule
  ],
  exports: [AgendaComponent]
})
export class AgendaModule { }
