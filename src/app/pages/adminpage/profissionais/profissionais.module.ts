import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfissionaisComponent } from './profissionais.component';



@NgModule({
  declarations: [ProfissionaisComponent],
  imports: [
    CommonModule
  ],
  exports:[
    ProfissionaisComponent
  ]
})
export class ProfissionaisModule { }
