import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  toggleSlot(event: Event) {
    const target = event.target as HTMLElement;
    target.classList.toggle('filled');
  }
  
}
