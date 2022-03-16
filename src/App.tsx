import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Store, StoreProvider } from './Store';

// https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes


function App() {
  const {state,dispatch} = useContext(Store)
  console.log(store);
  
  const fetchDataAction = async () => {
    const url = 'https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes'
    const response = await fetch(url)
    const data = await response.json()
    return dispatch({
      type: "FETCH_DATA",
      payload: data._embedded.episodes
    })
  }

  useEffect(() => {
    fetchDataAction()

  }, [])
  
  
  return (
    <div className="App">
      <h1>Rick and Morty!!</h1>
      <p>Pick your Favorite episode!</p>
      <section>
        {state.episodes.map((episode) => {
          <section key={episode.id}></section>
        })}
      </section>
    </div>
  );
}

export default App;
