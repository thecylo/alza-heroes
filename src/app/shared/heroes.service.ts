import { Injectable } from '@angular/core';
import { Hero } from '../models/hero-model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  constructor(private http: HttpClient) {}

  getAllHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`/api/heroes`);
  }

  getHeroById(id: number): Observable<Hero> {
    return this.http.get<Hero>(`/api/heroes/${id}`);
  }

  updateHero(hero: Hero): Observable<object> {
    return this.http.put(`/api/heroes/${hero.id}`, hero);
  }

  deleteHero(id: number): Observable<object> {
    return this.http.delete(`/api/heroes/${id}`);
  }

  createHero(hero: Hero): Observable<object> {
    return this.http.post(`/api/heroes`, hero);
  }
}
