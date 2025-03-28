export default function Movie(props) {

  // Destructure props into separate variables
  let { title, description } = props;
  let { posterImage } = description;
  let { length } = description;

  // Add the correct domain to the image path
  posterImage = 'https://cinema-rest.nodehill.se/' + posterImage;

  return <div className="movie">
    <h2>{title}</h2>
    <h3>Runtime: {length} minutes</h3>
    <img src={posterImage} />
  </div>;
}