import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendaComponent } from './agenda.component';



@NgModule({
  declarations: [
    AgendaComponent],
  imports: [
    CommonModule
  ],
  exports: [
    AgendaComponent
  ]
})
export class AgendaModule { }
