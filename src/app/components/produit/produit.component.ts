import { Component } from '@angular/core';
import { Produit } from '../../models/produit.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ProduitComponent {
   // Propriétés pour le formulaire
  produits: Produit[] = [];
  filteredProduits: Produit[] = [];
  searchTerm: string = '';
  
  newProduit: Produit = this.resetProduitForm();
  isEditing: boolean = false;
  editIndex: number = -1;
  errorMessage: string = '';
  showConfirmDelete: boolean = false;
  deleteIndex: number = -1;
  addProduit(): void {
    this.errorMessage = '';
    
    // Vérification des doublons
    if (!this.isEditing && this.isDuplicate(this.newProduit.nom)) {
      this.errorMessage = `Un produit avec le nom "${this.newProduit.nom}" existe déjà.`;
      return;
    }

    if (this.isEditing) {
      // Mode édition
      this.produits[this.editIndex] = {...this.newProduit};
      this.isEditing = false;
      this.editIndex = -1;
    } else {
      // Mode ajout
      const produitToAdd = {
        ...this.newProduit,
        id: this.generateId()
      };
      this.produits.push(produitToAdd);
    }

    this.newProduit = this.resetProduitForm();
    this.filterProduits();
  }

  editProduit(index: number): void {
    this.isEditing = true;
    this.editIndex = index;
    this.newProduit = {...this.produits[index]};
  }

  confirmDelete(index: number): void {
    this.showConfirmDelete = true;
    this.deleteIndex = index;
  }

  cancelDelete(): void {
    this.showConfirmDelete = false;
    this.deleteIndex = -1;
  }

  deleteProduit(): void {
    if (this.deleteIndex !== -1) {
      this.produits.splice(this.deleteIndex, 1);
      this.showConfirmDelete = false;
      this.deleteIndex = -1;
      this.filterProduits();
    }
  }

  resetProduitForm(): Produit {
    return {
      id: 0,
      nom: '',
      description: '',
      prix: 0,
      quantite: 0
    };
  }

  isDuplicate(nom: string): boolean {
    return this.produits.some(produit => produit.nom.toLowerCase() === nom.toLowerCase());
  }

  generateId(): number {
    return this.produits.length > 0 ? 
      Math.max(...this.produits.map(produit => produit.id)) + 1 : 1;
  }

  search(): void {
    this.filterProduits();
  }

  filterProduits(): void {
    if (!this.searchTerm.trim()) {
      this.filteredProduits = [...this.produits];
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredProduits = this.produits.filter(produit => 
        produit.nom.toLowerCase().includes(term) ||
        produit.description.toLowerCase().includes(term)
      );
    }
  }
}