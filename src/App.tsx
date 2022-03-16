import React, { useContext } from 'react';
import logo from './logo.svg';
import './App.css';
import { Store, StoreProvider } from './Store';

// https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes


function App() {
  const store = useContext(Store)
  console.log(store);
  
  return (
    <div className="App">
      <h1>Rick and Morty!!</h1>
      <p>Pick your Favorite episode!</p>
    </div>
  );
}

export default App;
