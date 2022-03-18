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
  ADD_FAV_DATA,
  REMOVE_FAVE_DATA,
}

export type ActionType =
  | { type: Actions.FETCH_DATA; payload: [] }
  | { type: Actions.SET_DATA; payload: IEpisode }
  | { type: Actions.ADD_FAV_DATA; payload: IEpisode }
  | { type: Actions.REMOVE_FAVE_DATA; payload: IEpisode };

type StoreContextProviderProps = {
  children: React.ReactNode;
};
interface IState {
  episodes: IEpisode[];
  favorites: IEpisode[];
}

const initialState: IState = {
  // initial state is a the generic passed to createContext
  episodes: [],
  favorites: [],
};

export const Store = createContext(initialState);

function reducer(state: IState = initialState, action: ActionType): IState {
  switch (action.type) {
    case Actions.FETCH_DATA:
      return {
        ...state,
        episodes: action.payload,
      };

    case Actions.ADD_FAV_DATA:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };

    case Actions.REMOVE_FAVE_DATA:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };

    default:
      return state;
  }
}

export function StoreProvider({
  children,
}: StoreContextProviderProps): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Store.Provider value={{ state, dispatch }}> {children} </Store.Provider>
  );
}
