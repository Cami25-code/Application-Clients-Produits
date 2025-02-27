import { Routes } from '@angular/router';
import { ClientComponent } from './components/client/client.component';
import { ProduitComponent } from './components/produit/produit.component';

export const routes: Routes = [
    {path: 'clients', component: ClientComponent},
    {path: 'produits', component: ProduitComponent},
    {path: '', redirectTo: '/clients', pathMatch: 'full'}
];
