import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LogarComponent } from './logar.component';
import { AuthService } from '../../../services/auth.service';

@NgModule({
  declarations: [LogarComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [LogarComponent],
  providers: [AuthService],
})
export class LogarModule {}
