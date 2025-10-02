import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicosComponent } from './servicos.component';
import { SidebarModule } from '../admin/shared/sidebar/sidebar.module';



@NgModule({
  declarations: [
    ServicosComponent],
  imports: [
    CommonModule,
    SidebarModule
  ],
  exports:[
    ServicosComponent
  ]
})
export class ServicosModule { }
