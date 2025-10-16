import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { AppRoutingModule } from "src/app/app-routing.module";
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProfileComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule
],
  exports:[
    ProfileComponent
  ],
})
export class ProfileModule { }
