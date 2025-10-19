import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfissionaisComponent } from './profissionais.component';
import { SidebarModule } from '../admin/shared/sidebar/sidebar.module';



@NgModule({
  declarations: [
    ProfissionaisComponent],
  imports: [
    CommonModule,
    SidebarModule,
    
  ],
  exports:[
    ProfissionaisComponent
  ]
})
export class ProfissionaisModule { }
