import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class SidebarComponent {
  @Input() activeComponent: 'client' | 'produit' = 'client';
  @Output() setActive = new EventEmitter<'client' | 'produit'>();

  setActiveComponent(component: 'client' | 'produit'): void {
    this.setActive.emit(component);
  }
}