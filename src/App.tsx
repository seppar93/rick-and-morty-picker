import React, { useCallback, useContext, useEffect } from 'react';
import './App.css';
import { Actions, ActionType, IEpisode, Store} from './Store';



function App() {
  const { state, dispatch } = useContext(Store);

  const fetchDataAction = useCallback(
     async () => {
    const url =
    'https://api.tvmaze.com/singlesearch/shows?q=morty&embed=episodes';
  const response = await fetch(url);
  const data = await response.json();
  // console.log('DATA', data);

  return dispatch({
    type: Actions.FETCH_DATA,
    payload: data._embedded.episodes,
  });
  },

    [dispatch],
  )


  // const fetchDataAction = async () => {
    // const url =
    //   'https://api.tvmaze.com/singlesearch/shows?q=morty&embed=episodes';
    // const response = await fetch(url);
    // const data = await response.json();
    // console.log('DATA', data);

    // return dispatch({
    //   type: Actions.FETCH_DATA,
    //   payload: data._embedded.episodes,
    // });
  // };

  useEffect(() => {
    const checkSession = sessionStorage.getItem('episodes');
    if (checkSession) {
      return dispatch({
        type: 'SET_DATA',
        payload: JSON.parse(checkSession),
      });
    }

    fetchDataAction();
  }, [dispatch, fetchDataAction]);

  // console.log(state);

  const toggleFavAction = (episode: IEpisode) => {
    const alreadyInFav = state.favorites.includes(episode)
    let dispatchObj = {
      type: Actions.ADD_FAV_DATA,
      payload: episode
    }
    if(alreadyInFav) {
      const favWithoutEpisode = state.favorites.filter((fav:IEpisode) => fav.id !== episode.id)
      dispatchObj = {
        type: Actions.ADD_FAV_DATA,
        payload: favWithoutEpisode
      }
    }
    dispatch(dispatchObj)

    console.log(state);
    
  }
  return (
    <div className='App'>
      <header className='header'>
        <h1>Rick and Morty!!</h1>
        <p>Pick your Favorite episode!</p>
      </header>
      <section className='episode-layout'>
        {state.episodes.map((episode:IEpisode) => {
          return (
            <section className='episode-box' key={episode.id}>
              <img src={episode.image.medium} alt={episode.name} />
              <div>{episode.name}</div>
              <section>
                Season:{episode.season} Number: {episode.number}
                <button type='button' onClick={() => toggleFavAction(episode)}>Add to Favorite</button>
              </section>
            </section>
          );
        })}
      </section>
    </div>
  );
}

export default App;
