import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendamentoComponent } from './agendamento.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [AgendamentoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, 
    RouterModule,  
  ],
  exports: [
    AgendamentoComponent
  ]
})
export class AgendamentoModule { }
