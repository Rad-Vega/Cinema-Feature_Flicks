import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from 'react'
import Screening from './Screening'
import './App.css'

export default function App() {

  // List of movies stored as array in state
  const [movies, setMovies] = useState([]);
  const [screenings, setScreenings] = useState([]);

  useEffect(() => {
    (async () => {
      // Fetches movies & screenings from API, converts to json & stores in state variable
      setMovies(await (await (fetch('/api/movies'))).json());
      setScreenings(await (await (fetch('/api/screenings'))).json());
    })();
  }, []);

  return (
    <div className="App">
      <header>
        <h1>Feature Flicks Cinema</h1>
      </header>
      {screenings.map(({ id, time, movieId, auditoriumId }) => {
        const matchingMovie = movies.find(movie => movie.id === movieId);

        if (!matchingMovie) {
          return <div key={id}>Movie in screening not found {id}</div>;
        }

        const screeningDateTime = new Date(time).toLocaleString('en-SE', {
          dateStyle: 'full',
          timeStyle: 'short',
        });

        return (
          <div key={id}>
            <h4>{screeningDateTime}</h4>
            <Screening
              screeningTime={time}
              auditoriumId={auditoriumId}
              movie={matchingMovie}
            />
          </div>
        );
      })}
    </div>
  );

}