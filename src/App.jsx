import { useState, useEffect } from 'react'
import Movie from './Movie'

import './App.css'

export default function App() {

  // List of movies stored as array in state
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    (async () => {
      // Fetches movies from API, converts to json & stores in state variable
      setMovies(await (await (fetch('/api/movies'))).json());
    })();
  }, []);

  return <div className="App">
    <header>
      <h1>Feature Flicks Cinema</h1>
    </header>
    {movies.map(({ id, title, description }) => <Movie
      key={id}
      title={title}
      description={description}
    />)}
  </div>;

}