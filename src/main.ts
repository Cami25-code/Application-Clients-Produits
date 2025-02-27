import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: 'clients', loadComponent: () => import('./app/components/client/client.component').then(m => m.ClientComponent) },
      { path: 'produits', loadComponent: () => import('./app/components/produit/produit.component').then(m => m.ProduitComponent) },
      { path: '', redirectTo: '/clients', pathMatch: 'full' }
    ])
  ]
}).catch(err => console.error(err));
