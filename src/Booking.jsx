import { useState } from 'react';
import { useParams } from 'react-router';
import DisplayChairs from './DisplaySeats';

// Counter for a ticket type
function TicketCounter({ label, count, incrementDisabled, onIncrement, onDecrement }) {
  return (
    <div className="ticket-counter">
      <h3>{label}</h3>
      <button onClick={onDecrement} disabled={count <= 0}>–</button>
      <span style={{ margin: '0 8px' }}>{count}</span>
      <button onClick={onIncrement} disabled={incrementDisabled}>+</button>
    </div>
  );
}

export default function Booking({ movies, screenings }) {
  const { screeningId } = useParams(); // Extract screening ID from booking route
  const [selectedSeats, setSelectedSeats] = useState([]); // State to manage selected seats

  console.log(selectedSeats)

  // Ticket counters state
  const [ticketCounts, setTicketCounts] = useState({
    adult: 0,
    senior: 0,
    child: 0,
  });

  const totalTickets = ticketCounts.adult + ticketCounts.senior + ticketCounts.child;
  const incrementDisabled = totalTickets >= selectedSeats.length;

  // Handlers to increment & decrement ticket counts
  const handleIncrement = (type) => {
    if (totalTickets < selectedSeats.length) {
      setTicketCounts(prev => ({ ...prev, [type]: prev[type] + 1 }));
    }
  };

  const handleDecrement = (type) => {
    setTicketCounts(prev => ({ ...prev, [type]: Math.max(prev[type] - 1, 0) }));
  };

  return (
    <div>
      <h1>Booking</h1>
      <DisplayChairs
        screeningId={screeningId}
        onSelectionChange={setSelectedSeats} // Pass the state setter function to child component
      />
      {selectedSeats.length > 0 && (
        <div className="ticket-selection">
          <h2>Select Ticket Types</h2>
          <TicketCounter
            label="Adult"
            count={ticketCounts.adult}
            incrementDisabled={incrementDisabled}
            onIncrement={() => handleIncrement('adult')}
            onDecrement={() => handleDecrement('adult')}
          />
          <TicketCounter
            label="Senior"
            count={ticketCounts.senior}
            incrementDisabled={incrementDisabled}
            onIncrement={() => handleIncrement('senior')}
            onDecrement={() => handleDecrement('senior')}
          />
          <TicketCounter
            label="Child"
            count={ticketCounts.child}
            incrementDisabled={incrementDisabled}
            onIncrement={() => handleIncrement('child')}
            onDecrement={() => handleDecrement('child')}
          />
        </div>
      )}
    </div>
  );
}
