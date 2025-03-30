// Example code presented in the course work, modified & re-used in this project
// React component displaying auditorium seating

import { useEffect, Fragment } from 'react';
import { useStates } from './utils/states';

export default function DisplayChairs({ screeningId, onSelectionChange }) {

  const s = useStates({
    screening: null,
    movie: null,
    seats: []
  });

  useEffect(() => {
    (async () => {
      s.screening = null;
      s.movie = null;
      s.seats = [];

      let screening = (await (await fetch(`/api/occupied_seats?screeningId=${screeningId}`)).json())[0];

      // Convert the string of occupied seats into an array of numbers
      screening.occupiedSeats = screening.occupiedSeats.split(', ').map(x => +x);

      // Set the state variable
      s.screening = screening;

      // Get the movie (with poster image, length of movie etc)
      s.movie = (await (await fetch(`/api/movies?title=${screening.movie}`)).json())[0];

      // Get the aditorium id from the auditorium name
      let auditoriumId = ['Stora Salongen', 'Lilla Salongen']
        .indexOf(s.screening.auditorium) + 1;

      // Get the seats
      let seats = await (await fetch(
        `/api/seats/?auditoriumId=${auditoriumId}&sort=seatNumber`)).json();

      // Convert the data structure from an array of objects
      // to an array (rows) of arrays (seats in rows) of objects
      let rows = [];
      let row;
      let latestRow;

      for (let seat of seats) {
        // Add a new property: Is the seat occupied? (true/false)
        seat.occupied = screening.occupiedSeats.includes(seat.seatNumber);
        // Arrange seats into rows
        if (latestRow !== seat.rowNumber) {
          row = [];
          rows.push(row);
        }
        row.push(seat);
        latestRow = seat.rowNumber
      }

      // Set the state variable
      s.seats = rows;
    })();
  }, [screeningId]);

  function toggleSeatSelection(seat) {
    // do nothing if occupied
    if (seat.occupied) { return; }
    // select if not selected, deselect if selected
    seat.selected = !seat.selected;

    let selectedSeats = [];
    for (const row of s.seats) {
      selectedSeats = selectedSeats.concat(row.filter(seat => seat.selected));
    }
    // Calls callback prop to pass selected seats to parent component, updating state

    onSelectionChange(selectedSeats);

  }

  // output the seats
  return s.seats.length === 0 ? null : <div className="screening-and-seats">
    <h2>{s.screening.movie}</h2>
    <h3>{new Date(s.screening.screeningTime).toLocaleString('en-SE', {
      dateStyle: 'full',
      timeStyle: 'short'
    })}</h3>
    <img
      className="poster-screen"
      src={'https://cinema-rest.nodehill.se' + s.movie.description.posterImage} />
    <div className="seats">
      {/* Following creates a Fragment for each seat & provides it with a unique key based index & rowNumber */}
      {s.seats.map(row => <Fragment key={row.length > 0 ? `row-${row[0].rowNumber}` : 'row-empty'}><div className="row">
        {/* Following provides unique key to each seat rendered by taking the difference of rowNumber & seatNumber. */}
        { /* The reason this is required is due to how these numbers are being handled internally */}
        {row.map((seat) => <div key={`seat-${seat.rowNumber}-${seat.seatNumber}`} className={
          (seat.selected ? 'selected' : '')
          + (seat.occupied ? ' occupied' : '')
        }
          onClick={() => toggleSeatSelection(seat)}>{seat.seatNumber}
        </div>)}
      </div><br /></Fragment>)}
    </div>
  </div>;
}