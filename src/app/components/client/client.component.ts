import { Component } from '@angular/core';
import { Client } from '../../models/client.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]  
})
export class ClientComponent {
  clients: Client[] = [];
  filteredClients: Client[] = [];
  searchTerm: string = '';
  
  newClient: Client = this.resetClientForm();
  isEditing: boolean = false;
  editIndex: number = -1;
  errorMessage: string = '';
  showConfirmDelete: boolean = false;
  deleteIndex: number = -1;
  addClient(): void {
    this.errorMessage = '';
    
    // Vérification des doublons
    if (!this.isEditing && this.isDuplicate(this.newClient.nom)) {
      this.errorMessage = `Un client avec le nom "${this.newClient.nom}" existe déjà.`;
      return;
    }

    if (this.isEditing) {
      // Mode édition
      this.clients[this.editIndex] = {...this.newClient};
      this.isEditing = false;
      this.editIndex = -1;
    } else {
      // Mode ajout
      const clientToAdd = {
        ...this.newClient,
        id: this.generateId()
      };
      this.clients.push(clientToAdd);
    }

    this.newClient = this.resetClientForm();
    this.filterClients();
  }

  editClient(index: number): void {
    this.isEditing = true;
    this.editIndex = index;
    this.newClient = {...this.clients[index]};
  }

  confirmDelete(index: number): void {
    this.showConfirmDelete = true;
    this.deleteIndex = index;
  }

  cancelDelete(): void {
    this.showConfirmDelete = false;
    this.deleteIndex = -1;
  }

  deleteClient(): void {
    if (this.deleteIndex !== -1) {
      this.clients.splice(this.deleteIndex, 1);
      this.showConfirmDelete = false;
      this.deleteIndex = -1;
      this.filterClients();
    }
  }

  resetClientForm(): Client {
    return {
      id: 0,
      nom: '',
      prenom: '',
      email: '',
      telephone: ''
    };
  }

  isDuplicate(nom: string): boolean {
    return this.clients.some(client => client.nom.toLowerCase() === nom.toLowerCase());
  }

  generateId(): number {
    return this.clients.length > 0 ? 
      Math.max(...this.clients.map(client => client.id)) + 1 : 1;
  }

  search(): void {
    this.filterClients();
  }

  filterClients(): void {
    if (!this.searchTerm.trim()) {
      this.filteredClients = [...this.clients];
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredClients = this.clients.filter(client => 
        client.nom.toLowerCase().includes(term) ||
        client.prenom.toLowerCase().includes(term) ||
        client.email.toLowerCase().includes(term)
      );
    }
  }
}

    