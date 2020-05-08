import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Hero } from 'src/app/models/hero-model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  heroes = new Array<Hero>();
  storeSubscription: Subscription;
  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    this.storeSubscription = this.store
      .select('heroes')
      .subscribe((heroesData) => {
        this.heroes = [...heroesData.data];
        this.heroes.sort((a, b) => a.id - b.id);
      });
  }

  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe();
  }
}
