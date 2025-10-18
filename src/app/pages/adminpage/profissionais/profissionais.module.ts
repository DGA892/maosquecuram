import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfissionaisComponent } from './profissionais.component';
import { SidebarModule } from '../admin/shared/sidebar/sidebar.module';
import { FooterModule } from 'src/app/shared/footer/footer.module';



@NgModule({
  declarations: [
    ProfissionaisComponent],
  imports: [
    CommonModule,
    SidebarModule,
    FooterModule
  ],
  exports:[
    ProfissionaisComponent
  ]
})
export class ProfissionaisModule { }
