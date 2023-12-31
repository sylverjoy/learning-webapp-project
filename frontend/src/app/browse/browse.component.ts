import { Component, Inject, Injector, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-deck',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent {
  decks: any[] = [];
  cardsNeverReviewed: any[] =[];
  cardsReviewedToday: any[] =[];



  constructor(@Inject(Injector) private injector: Injector) {}

  ngOnInit(): void {
    const apiService = this.injector.get(ApiService);
    apiService.getAllDecks().subscribe((decks: any) => {
      this.decks = decks;
    });
    apiService.getCardsNeverReviewed().subscribe((cards:any )=> {
      this.cardsNeverReviewed = cards;
    });
    apiService.getCardsReviewedToday().subscribe((cards:any) => {
      this.cardsReviewedToday = cards;
    });
  }
}
