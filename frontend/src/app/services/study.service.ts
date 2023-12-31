import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudyService {
  selectedDeckId: number | null = null;
  currentCardIndex: number = 0;
  userCardStatus: 'hard' | 'good' | 'easy' | null = null;

  setSelectedDeckId(deckId: number): void {
    this.selectedDeckId = deckId;
  }

  startStudy(): void {
    // Reset study state when starting a new study session
    this.currentCardIndex = 0;
    this.userCardStatus = null;
  }

  showVerso(): void {
    // Implement logic to show the verso of the current card
  }

  nextCard(): void {
    // Implement logic to move to the next card in the deck
  }

  addStatus(status: 'hard' | 'good' | 'easy'): void {
    this.userCardStatus = status;
    // Implement logic to update user's progress or save the status
  }
}