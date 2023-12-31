import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  deckId: number | undefined;
  cards: any[] = [];
  currentCardIndex: number = 0;
  showAnswer: boolean = false;

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.deckId = +idParam;
        this.apiService.getDeckById(this.deckId).subscribe((deck: any) => {
          // Create Userdeck if not created
          if (deck[0].UserDecks.length == 0) {
            //this.apiService.createUserDeck({

            //});
          };
          if (deck[0].Cards) {
            console.log(deck[0].Cards)
            this.cards = deck[0].Cards;
          } else {
            this.cards = []; 
            console.log('Aucune carte trouvée ou deck est indéfini');
          }
        });
      }
    });
  }
  isDeckCompleted: boolean = false;
  confidenceLevels = {
    Again: 0,
    Hard: 0,
    Good: 0,
    Easy: 0
  };
  setConfidenceLevel(level: 'Again' | 'Hard' | 'Good' | 'Easy'): void {
    let currentCard = this.cards[this.currentCardIndex];
    currentCard.confidenceLevel = level;
    this.confidenceLevels[level]++;
    currentCard.numberOfTimesReviewed += 1;
    currentCard.lastReviewedDate = new Date().toISOString();
  
    switch(level) {
      case 'Again':
        currentCard.nextReviewDate = 1;
        break;
      case 'Hard':
        currentCard.nextReviewDate = 2;
        break;
      case 'Good':
        currentCard.nextReviewDate = 3;
        break;
      case 'Easy':
        currentCard.nextReviewDate = 4;
        break;
    }
  
    this.apiService.updateCard(currentCard.id, currentCard).subscribe(response => {
      console.log('Carte mise à jour avec succès');
    });
  
    this.loadNextCard();
  }

  loadNextCard(): void {
    if (this.currentCardIndex < this.cards.length - 1) {
      this.currentCardIndex++;
      this.showAnswer = false;
    } else {
      this.isDeckCompleted = true;
    }
  }
  toggleAnswer(): void {
    this.showAnswer = !this.showAnswer;
  }
}