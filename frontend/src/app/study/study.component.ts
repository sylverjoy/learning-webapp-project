// study.component.ts

import { Component, OnInit } from '@angular/core';
import { StudyService } from '../services/study.service';
import { DeckService } from '../services/deck.service';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.css']
})
export class StudyComponent implements OnInit {
  selectedDeck: any | null = null;
  currentCard: any | null = null;

  constructor(
    public studyService: StudyService,  // <-- Make studyService public
    private deckService: DeckService
  ) {}

  ngOnInit(): void {
    this.selectedDeck = this.deckService.getDeckById(this.studyService.selectedDeckId!);
    this.startStudy();
  }

  startStudy(): void {
    this.studyService.startStudy();
    this.showNextCard();
  }

  showNextCard(): void {
    this.currentCard = this.selectedDeck?.Cards[this.studyService.currentCardIndex];
  }

  showVerso(): void {
    // Implement logic to show the verso of the current card
  }

  nextCard(): void {
    this.studyService.nextCard();
    this.showNextCard();
  }

  addStatus(status: 'hard' | 'good' | 'easy'): void {
    this.studyService.addStatus(status);
    this.nextCard();
  }

}
