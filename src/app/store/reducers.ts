import * as fromActions from './actions';
import { Hero } from '../models/hero-model';

export interface HeroState {
  data: Hero[];
}

export const initialState: HeroState = {
  data: [],
};

export function heroReducer(
  state = initialState,
  action: { type: string; payload: any }
): HeroState {
  switch (action.type) {
    case fromActions.HeroesActions.ADD_HERO: {
      const data = [...state.data, action.payload];
      return { ...state, data };
    }
    case fromActions.HeroesActions.REMOVE_HERO: {
      const data = state.data.filter((hero) => hero.id !== action.payload.id);
      return { ...state, data };
    }
    case fromActions.HeroesActions.UPDATE_HERO: {
      const index = state.data.findIndex(
        (hero) => hero.id === action.payload.id
      );
      const data = [...state.data];
      index > -1 && data.splice(index, 1) && data.push(action.payload);
      return { ...state, data };
    }
  }
  return state;
}
