import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfissionaisComponent } from './profissionais.component';
import { SidebarModule } from '../admin/shared/sidebar/sidebar.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProfissionaisComponent],
  imports: [
    CommonModule,
    SidebarModule,
    FormsModule
  ],
  exports:[
    ProfissionaisComponent
  ]
})
export class ProfissionaisModule { }
