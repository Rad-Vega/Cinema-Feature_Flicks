import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

export default function Screening(props) {

  // Destructure props into separate variables
  let { title, description } = props.movie;
  let { posterImage, length, categories } = description;

  let { screeningTime, auditoriumId } = props;


  const auditoriumNames = {
    1: 'Stora Salongen',
    2: 'Lilla Salongen'
  };

  const time = new Date(screeningTime).toLocaleTimeString('sv-SE', {
    timeStyle: 'short'
  });

  const runTimeHours = Math.floor(length / 60);
  const runTimeMinutes = length % 60;
  const formattedRunTime = `${runTimeHours > 0 ? runTimeHours + 'h ' : ''}${runTimeMinutes}m`;

  // Add the correct domain to the image path
  posterImage = 'https://cinema-rest.nodehill.se/' + posterImage;

  return (
    <Card style={{ width: '20rem', margin: '1rem' }}>
      <Card.Img variant="top" src={posterImage} alt={title} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-1 text-muted">{time}</Card.Subtitle>
      </Card.Body>
      <ListGroup variant="flush">
        <ListGroup.Item>Categories: {categories.join(', ')}</ListGroup.Item>
        <ListGroup.Item>Auditorium: {auditoriumNames[auditoriumId]}</ListGroup.Item>
        <ListGroup.Item>Runtime: {formattedRunTime}</ListGroup.Item>
      </ListGroup>
    </Card>
  );
}