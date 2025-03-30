import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import BookingConfirmation from './BookingConfirmation';
import DisplayChairs from './DisplaySeats';

// Counter for a ticket type
function TicketCounter({ label, count, incrementDisabled, onIncrement, onDecrement }) {
  return (
    <div className="ticket-counter">
      <h5>{label}</h5>
      <button onClick={onDecrement} disabled={count <= 0}>–</button>
      <span style={{ margin: '0 8px' }}>{count}</span>
      <button onClick={onIncrement} disabled={incrementDisabled}>+</button>
    </div>
  );
}

export default function Booking() {
  const { screeningId } = useParams(); // Extract screening ID from booking route
  const [selectedSeats, setSelectedSeats] = useState([]); // State to manage selected seats

  // Ticket counters state
  const [ticketCounts, setTicketCounts] = useState({
    adult: 0,
    senior: 0,
    child: 0,
  });

  // Tracks total number of tickets chosen
  const totalTickets = ticketCounts.adult + ticketCounts.senior + ticketCounts.child;
  // Bool to disable incrementation in TicketCounter if total tickets is equal to selected seats
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

  // State for conditional display of BookingConfirmation
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Handler for booking button click
  const handleBook = () => {
    setShowConfirmation(true);
  };

  useEffect(() => {
    setShowConfirmation(false); // Reset booking confirmation when state changes
  }, [selectedSeats, ticketCounts]);

  const sumTotal = ticketCounts.adult * 85 + ticketCounts.senior * 75 + ticketCounts.child * 65;

  return (
    <div>
      <Link to="/" style={{ textDecoration: 'none', marginBottom: '1rem', display: 'block' }}>
        ← Back to Homepage
      </Link>
      <h2 className='booking-title'>Booking</h2>
      <DisplayChairs
        screeningId={screeningId}
        onSelectionChange={setSelectedSeats} // Pass the state setter function to child component
      />
      {selectedSeats.length > 0 && (
        <div className="ticket-selection">
          <Card className="border-0">
            <Card.Title style={{ fontSize: 25 }}>Choose Tickets</Card.Title>
            <TicketCounter
              label="Adult (85 SEK)"
              count={ticketCounts.adult}
              incrementDisabled={incrementDisabled}
              onIncrement={() => handleIncrement('adult')}
              onDecrement={() => handleDecrement('adult')}
            />
            <TicketCounter
              label="Senior (75 SEK)"
              count={ticketCounts.senior}
              incrementDisabled={incrementDisabled}
              onIncrement={() => handleIncrement('senior')}
              onDecrement={() => handleDecrement('senior')}
            />
            <TicketCounter
              label="Child (65 SEK)"
              count={ticketCounts.child}
              incrementDisabled={incrementDisabled}
              onIncrement={() => handleIncrement('child')}
              onDecrement={() => handleDecrement('child')}
            />
          </Card>
          <Button variant="primary" disabled={totalTickets === 0 || totalTickets < selectedSeats.length} className="mb-2" size="lg" onClick={handleBook}>
            Confirm Booking
          </Button>
        </div>
      )}
      {showConfirmation && (
        <BookingConfirmation
          selectedSeats={selectedSeats}
          ticketCounts={ticketCounts}
          totalPrice={sumTotal}
        />
      )}
    </div>
  );
}
