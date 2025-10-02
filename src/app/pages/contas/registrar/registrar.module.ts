import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrarComponent } from './registrar.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    RegistrarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // <<--- ESSENCIAL
    RouterModule
  ],
  exports: [
    RegistrarComponent
  ]
})
export class RegistrarModule {}
