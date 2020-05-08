import { Component, OnInit } from '@angular/core';
import { HeroesService } from './shared/heroes.service';
import {first} from 'rxjs/operators';
import {AddHero} from './store/actions';
import { Hero } from './models/hero-model';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Tour of Alza Heroes';
  heroes =  new Array<Hero>();
  constructor(private service: HeroesService, private store: Store<Hero[]>){}

  ngOnInit(){
    let heroes;
    this.service.getAllHeroes().pipe(first()).subscribe(heroesInc => heroes = heroesInc, err => console.error(err), () => {
      heroes.forEach(hero => this.store.dispatch(new AddHero(hero)));
    });
  }
}
