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
            const startDate = new Date();
            const expectedEndDate = new Date(startDate);
            expectedEndDate.setMonth(startDate.getMonth() + 1);
            this.apiService.createUserDeck({
              startDate: startDate,
              expectedEndDate: expectedEndDate,
              minutesPerDayObjective: 30,
              DeckId: this.deckId,
            });
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
    this.apiService.getCardById(this.cards[this.currentCardIndex].id).subscribe((card: any) => {
      //Create UserCard if not created
      if (card[0].UserCards.length == 0) {
        this.apiService.createUserCard({
          CardId: card.id
        })
      };
      card[0].UserCards[0].confidenceLevel = level;
      this.confidenceLevels[level]++;
      card[0].UserCards[0].numberOfTimesReviewed += 1;
      card[0].UserCards[0].lastReviewedDate = new Date();
  
      switch(level) {
        case 'Again':
          card[0].UserCards[0].nextReviewDate = new Date();
          this.cards.push(card);
          break;
        case 'Hard':
          card[0].UserCards[0].nextReviewDate = new Date(new Date().getTime() + (2 * 1000 * 60 * 60 * 24));
          break;
        case 'Good':
          card[0].UserCards[0].nextReviewDate = new Date(new Date().getTime() + (4 * 1000 * 60 * 60 * 24));
          break;
        case 'Easy':
          card[0].UserCards[0].nextReviewDate = new Date(new Date().getTime() + (6 * 1000 * 60 * 60 * 24));
        break;
      }
  
      this.apiService.updateUserCard( card[0].UserCards[0].id,  card[0].UserCards[0]).subscribe(response => {
        console.log('Carte mise à jour avec succès');
      });
  
      this.loadNextCard();
      }) ;
     
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