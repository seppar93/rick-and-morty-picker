import  { createContext } from 'react'


export const Store = createContext();
const initialState = {

}

function reducer() {
    // pass
}

export function StoreProvider(props): JSX.Element{
    return <Store.Provider value='test'> {props.children} </Store.Provider>
}