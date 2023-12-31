import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) {}

  // Card Routes
  getAllCards(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/cards`);
  }

  getCardById(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/cards/${id}`);
  }

  createCard(card: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/cards`, card);
  }

  updateCard(id: number, card: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/cards/${id}`, card);
  }

  // Deck Routes
  getAllDecks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/decks`);
  }

  getDeckById(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/decks/${id}?include=Cards`);
  }

  createDeck(deck: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/decks`, deck);
  }

  updateDeck(id: number, deck: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/decks/${id}`, deck);
  }

  // UserDeck Routes
  getAllUserDecks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/userdecks`);
  }

  getUserDeckById(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/userdecks/${id}`);
  }

  createUserDeck(userDeck: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/userdecks`, userDeck);
  }

  updateUserDeck(id: number, userDeck: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/userdecks/${id}`, userDeck);
  }

  // UserCard Routes
  getAllUserCards(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/usercards`);
  }

  getUserCardById(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/usercards/${id}`);
  }

  createUserCard(userCard: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/usercards`, userCard);
  }

  updateUserCard(id: number, userCard: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/usercards/${id}`, userCard);
  }


  getCardsNeverReviewed(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/usercards/never-reviewed`);
  }

  getCardsReviewedToday(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/usercards/reviewed-today`);
  }
}
