import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SidebarComponent } from './sidebar.component';

@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    CommonModule,   // necessário para ngIf, ngFor, etc.
    RouterModule    // necessário para routerLink
  ],
  exports: [
    SidebarComponent   // exporta para poder usar em outros módulos
  ]
})
export class SidebarModule { }
