import { createContext, useReducer } from 'react';

export interface IEpisode {
  id: number;
  image: {
    medium: string;
  };
  number: number;
  season: number;
  url: string;
  name: string;
}

export enum Actions {
  FETCH_DATA,
  SET_DATA,
  SET_FAV_DATA,
}

type ActionType =
  | { type: Actions.FETCH_DATA; payload: [] }
  | { type: Actions.SET_DATA; payload: IEpisode }
  | { type: Actions.SET_FAV_DATA; payload: IEpisode };

interface IState {
  episodes: [];
  favorites: IEpisode[];
}

const initialState: IState = {
  // initial state is a the generic passed to createContext
  episodes: [],
  favorites: [],
};

export const Store = createContext<IState>(initialState);

function reducer(state: IState, action: ActionType):IState {
  switch (action.type) {
    case Actions.FETCH_DATA:
      return {
        ...state,
        episodes: action.payload,
      };

    case Actions.SET_FAV_DATA:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };

    default:
      return state;
  }
}

export function StoreProvider(props): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Store.Provider value={{ state, dispatch }}>
      {' '}
      {props.children}{' '}
    </Store.Provider>
  );
}
