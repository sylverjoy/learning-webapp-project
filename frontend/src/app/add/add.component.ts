import { Component, OnInit } from '@angular/core';
import { CardService } from '../services/card.service';
import { DeckService } from '../services/deck.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  card: any = {};
  decks: any[] = [];

  constructor(private cardService: CardService, private deckService: DeckService) {}

  ngOnInit(): void {
    this.deckService.getDecks().subscribe(decks => {
      this.decks = decks;
    });
  }

  addCard() {
    this.cardService.addCard(this.card).subscribe(
      (response) => {
        console.log('Card added successfully:', response);
        // You can redirect to another page or perform additional actions on success
      },
      (error) => {
        console.error('Error adding card:', error);
        // Handle error, show a message, etc.
      }
    );
  }
}