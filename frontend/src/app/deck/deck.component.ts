import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent implements OnInit {
  newDeck: any = {};
  decks: any[] = [];
  levels: any = [{"value": "Easy"}, {"value": "Medium"}, {"value": "Hard"}];

  constructor(private router: Router,private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getAllDecks().subscribe((data:any) => {
      this.decks = data;
    });
  }
  onDeckSelect(deckId: number): void {
    this.router.navigate(['/card', deckId]);
  }

  createDeck(): void {
    console.log(this.newDeck);
    this.apiService.createDeck(this.newDeck).subscribe({
      next: (deck:any) => {
        console.log('Deck created:', deck);
        this.decks.push(deck); // Ajoutez le nouveau deck à la liste
        this.newDeck = {}; // Réinitialisez le formulaire
      },
      error: (error:any) => console.error('There was an error!', error)
    });
  }
}