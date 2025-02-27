import { Component } from '@angular/core';
import { ProduitComponent } from "./components/produit/produit.component";
import { ClientComponent } from "./components/client/client.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent],
  template: `
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-3">
          <app-sidebar></app-sidebar>
        </div>
        <div class="col-md-9">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class AppComponent {
  title = 'Gestion Clients et Produits';
  activeComponent: 'client' | 'produit' = 'client';

  setActiveComponent(component: 'client' | 'produit'): void {
    this.activeComponent = component;
  }
}