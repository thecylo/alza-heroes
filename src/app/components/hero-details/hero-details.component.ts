import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Hero } from 'src/app/models/hero-model';
import { HeroesService } from 'src/app/shared/heroes.service';
import { first, finalize } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { UpdateHero } from '../../store/actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.scss'],
})
export class HeroDetailsComponent implements OnInit, OnDestroy {
  hero: Hero;
  index: number;
  storeSubscription: Subscription;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private service: HeroesService,
    private store: Store<any>
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(first())
      .subscribe((params) => (this.index = params.id));
    this.storeSubscription = this.store.select('heroes').subscribe((hero) => {
      const heros = hero.data;
      const index = heros.findIndex((hero) => hero.id === Number(this.index));
      this.hero = { ...heros[index] };
    });
  }

  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe();
  }

  previousPage(): void {
    this.location.back();
  }

  save(): void {
    this.store.dispatch(new UpdateHero(this.hero));
    this.service
      .updateHero(this.hero)
      .pipe(
        first(),
        finalize(() => this.previousPage())
      )
      .subscribe();
  }
}
