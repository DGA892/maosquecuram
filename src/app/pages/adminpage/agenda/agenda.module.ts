import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendaComponent } from './agenda.component';
import { SidebarModule } from '../admin/shared/sidebar/sidebar.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AgendaComponent],
  imports: [
    CommonModule,
    SidebarModule,
    FormsModule,
    
  ],
  exports: [AgendaComponent]
})
export class AgendaModule { }
