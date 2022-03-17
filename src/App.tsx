import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Store, StoreProvider } from './Store';

interface IEpisode {
  id:number
  image:string
  number:number
  season: number
  url:string
}

function App() {
  const { state, dispatch } = useContext(Store);

  const fetchDataAction = async () => {
    const url =
      'https://api.tvmaze.com/singlesearch/shows?q=morty&embed=episodes';
    const response = await fetch(url);
    const data = await response.json();
    console.log("DATA",data );
    
    return dispatch({
      type: 'FETCH_DATA',
      payload: data._embedded.episodes,
    });
  };

  useEffect(() => {
    const checkSession = sessionStorage.getItem('episodes');
    // if (checkSession) {
    //   return dispatch({
    //     type: 'SET_DATA',
    //     payload: JSON.parse(checkSession),
    //   });
    // }

    fetchDataAction();
  }, []);

  // console.log(state);
  
  return (
    <div className='App'>
      <h1>Rick and Morty!!</h1>
      <p>Pick your Favorite episode!</p>
      <section>
        {state.episodes.map((episode) => {
          return (

            <section key={episode.id}>
              <img src={episode.image.medium} alt={episode.name} />
              <div>{episode.name}</div>
              <section>
                Season:{episode.season} Number: {episode.number}
              </section>
              </section>
          )
        })}
      </section>
    </div>
  );
}

export default App;
