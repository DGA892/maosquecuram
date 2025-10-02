import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogarComponent } from './logar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LogarComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class LogarModule {}
