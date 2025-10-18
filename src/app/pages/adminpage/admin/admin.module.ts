import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AppRoutingModule } from "src/app/app-routing.module";
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { SidebarModule } from './shared/sidebar/sidebar.module';
import { FooterModule } from "src/app/shared/footer/footer.module";



@NgModule({
  declarations: [
    AdminComponent,],
  imports: [
    CommonModule,
    AppRoutingModule,
    SidebarModule,
    FooterModule
],
  exports: [
    AdminComponent
  ],

})
export class AdminModule { }
