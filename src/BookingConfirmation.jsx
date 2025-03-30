import generateBookingNumber from './utils/generate-booking-number';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';

export default function BookingConfirmation({ selectedSeats, ticketCounts, totalPrice }) {
  const bookingNumber = generateBookingNumber(); // Generates a random booking number

  return (
    <div>
      <Card className="mt-5">
        <Card.Title>Booking Confirmed!</Card.Title>
        <Card.Subtitle className="pb-3 text-muted">Confirmation Number: {bookingNumber}</Card.Subtitle>
        <Card.Body>
          <Card.Text className="fw-bold">Sum total: {totalPrice} SEK</Card.Text>
          <Card.Header>Booked Seats:</Card.Header>
          <ListGroup horizontal style={{ flexWrap: 'wrap' }}>
            {selectedSeats.map((seat, index) => (
              <ListGroup.Item key={index}>
                Row {seat.rowNumber}, Seat {seat.seatNumber}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
        <Card.Text style={{ fontSize: 15 }}>Show booking number to staff & pay</Card.Text>
      </Card>
      <Card>
        <Card.Body>
          <Card.Header>Tickets</Card.Header>
          <ListGroup>
            {Object.entries(ticketCounts).map(([type, count]) => (
              <ListGroup.Item key={type}>
                <strong>{type.charAt(0).toUpperCase() + type.slice(1)}:</strong> {count}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  );

}