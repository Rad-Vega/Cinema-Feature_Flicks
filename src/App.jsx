import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from 'react'
import ScreeningList from './ScreeningList'
import Booking from './Booking'
import { BrowserRouter, Route, Routes } from 'react-router'
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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ScreeningList movies={movies} screenings={screenings} />} />
          <Route path="/booking/:screeningId" element={<Booking />} /> {/* booking component will be rendered here */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}