import generateBookingNumber from './utils/generate-booking-number';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';

export default function BookingConfirmation({ selectedSeats, ticketCounts }) {
  const bookingNumber = generateBookingNumber(); // Generates a random booking number

  return (
    <div>
      <Card>
        <Card.Title>Booking Confirmed!</Card.Title>
        <Card.Subtitle className="mb-1 text-muted">Confirmation Number: {bookingNumber}</Card.Subtitle>
        <Card.Header>Booked Seats:</Card.Header>
        <ListGroup horizontal style={{ flexWrap: 'wrap' }}>
          {selectedSeats.map((seat, index) => (
            <ListGroup.Item key={index}>
              Row {seat.rowNumber}, Seat {seat.seatNumber}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
      <Card>
        <Card.Header>Tickets</Card.Header>
        <ListGroup>
          {Object.entries(ticketCounts).map(([type, count]) => (
            <ListGroup.Item key={type}>
              <strong>{type.charAt(0).toUpperCase() + type.slice(1)}:</strong> {count}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </div>
  );

}