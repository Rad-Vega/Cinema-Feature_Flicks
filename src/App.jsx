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

  const sortedScreenings = [...screenings].sort(
    (a, b) => new Date(a.time) - new Date(b.time)
  );

  const groupedScreenings = sortedScreenings.reduce((dateGroups, screening) => {
    // Formats date in ISO format ("2023-05-01")
    const dateKey = new Date(screening.time).toISOString().split('T')[0];
    if (!dateGroups[dateKey]) {
      dateGroups[dateKey] = [];
    }
    dateGroups[dateKey].push(screening);
    return dateGroups;
  }, {});

  return (
    <div className="App">
      <header>
        <h1>Feature Flicks Cinema</h1>
      </header>
      {Object.keys(groupedScreenings)
        .sort() // sorts dates in ascending order
        .map(dateKey => {
          // Formats date in more readable format, excluding time which is displayed in Screen component
          const formattedDate = new Date(dateKey).toLocaleDateString('en-SE', {
            dateStyle: 'full'
          });
          return (
            <div key={dateKey}>
              <h4>{formattedDate}</h4>
              {/* Maps through screenings for specific date */}
              {groupedScreenings[dateKey].map(({ id, time, movieId, auditoriumId }) => {
                const matchingMovie = movies.find(movie => movie.id === movieId);
                if (!matchingMovie) {
                  return <div key={id}>Movie in screening not found {id}</div>;
                }
                return (
                  <div key={id}>
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
        })}
    </div>
  );
}