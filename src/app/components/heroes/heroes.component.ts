import { Component, OnInit, OnDestroy } from '@angular/core';
import { Hero } from 'src/app/models/hero-model';
import { Router } from '@angular/router';
import { HeroesService } from 'src/app/shared/heroes.service';
import { first, finalize } from 'rxjs/operators';
import { RemoveHero, AddHero } from '../../store/actions';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit, OnDestroy {
  selectedHero: Hero;
  heroes = new Array<Hero>();
  storeSubscription: Subscription;
  constructor(
    private route: Router,
    private service: HeroesService,
    private store: Store<any>
  ) {}

  ngOnInit(): void {
    this.loadHeroes();
  }

  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe();
  }

  loadHeroes(): void {
    this.storeSubscription = this.store
      .select('heroes')
      .subscribe((heroesData) => {
        this.heroes = [...heroesData.data];
        this.heroes.sort((a, b) => a.id - b.id);
      });
  }

  selectHero(hero: Hero): void {
    this.selectedHero = hero;
  }

  navigateDetails(): void {
    this.route.navigate(['/detail', this.selectedHero.id]);
  }

  deleteHero(hero: Hero): void {
    this.store.dispatch(new RemoveHero(hero));
    this.service
      .deleteHero(hero.id)
      .pipe(
        first(),
        finalize(() => {
          this.selectedHero = null;
        })
      )
      .subscribe();
  }

  createHero(name: string): void {
    let max = Math.max(...this.heroes.map((hero) => hero.id)) + 1;
    const newHero = new Hero(max, name);
    this.store.dispatch(new AddHero(newHero));
    this.service.createHero(newHero).pipe(first()).subscribe();
  }
}
