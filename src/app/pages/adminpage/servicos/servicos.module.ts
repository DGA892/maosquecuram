import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicosComponent } from './servicos.component';
import { SidebarModule } from '../admin/shared/sidebar/sidebar.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ServicosComponent],
  imports: [
    CommonModule,
    SidebarModule,
    FormsModule
  ],
  exports:[
    ServicosComponent
  ]
})
export class ServicosModule { }
