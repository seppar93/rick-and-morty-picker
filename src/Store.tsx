import  { createContext, useReducer } from 'react'

interface IAction {
    type:string,
    payload: any
}

interface IState {
    episodes: [],
    favorites: []
}

const initialState:IState = {
    // initial state is a the generic passed to createContext
    episodes: [],
    favorites: []
}

export const Store = createContext<IState>(initialState);



function reducer(state: IState,action:IAction) {
    switch(action.type){
        case 'FETCH_DATA': 
            return {
                ...state,
                episodes: action.payload
            }
        default:
            return state;
    }
    // pass
}

export function StoreProvider(props): JSX.Element{
    
    const [state, dispatch] = useReducer(reducer, initialState)

    return <Store.Provider value={{state, dispatch}}> {props.children} </Store.Provider>
}