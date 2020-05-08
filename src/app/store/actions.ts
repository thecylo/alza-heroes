import { Action } from '@ngrx/store';

export enum HeroesActions {
  ADD_HERO = '[Hero] Add Hero',
  REMOVE_HERO = '[Hero] Remove Hero',
  UPDATE_HERO = '[Hero] Update Hero',
}

export class AddHero implements Action {
  readonly type = HeroesActions.ADD_HERO;
  constructor(private payload: any) {}
}

export class RemoveHero implements Action {
  readonly type = HeroesActions.REMOVE_HERO;
  constructor(private payload: any) {}
}

export class UpdateHero implements Action {
  readonly type = HeroesActions.UPDATE_HERO;
  constructor(private payload: any) {}
}
