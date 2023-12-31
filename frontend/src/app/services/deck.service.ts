import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  private apiUrl = 'http://localhost:3000/decks';

  constructor(private http: HttpClient) {}

  getDecks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getDeckById(deckId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${deckId}`);
  }
}