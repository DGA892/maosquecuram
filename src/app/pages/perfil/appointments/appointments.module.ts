import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentsComponent } from './appointments.component';
import { AppRoutingModule } from "src/app/app-routing.module";



@NgModule({
  declarations: [
    AppointmentsComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
],
  exports:[
    AppointmentsComponent
  ]
})
export class AppointmentsModule { }
