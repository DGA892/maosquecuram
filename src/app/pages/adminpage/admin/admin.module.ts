import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AppRoutingModule } from "src/app/app-routing.module";
import { SidebarModule } from './shared/sidebar/sidebar.module';



@NgModule({
  declarations: [
    AdminComponent,],
  imports: [
    CommonModule,
    AppRoutingModule,
    SidebarModule,
    
],
  exports: [
    AdminComponent
  ],

})
export class AdminModule { }
