import { useState } from 'react';
import Screening from './Screening';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router';

export default function ScreeningList({ movies, screenings }) {

  const [selectedCategory, setSelectedCategory] = useState("All");

  // Extracts unique categories from movies
  const categories = Array.from(
    new Set(movies.flatMap(movie => movie.description.categories))
  );

  const sortedScreenings = [...screenings].sort(
    (a, b) => new Date(a.time) - new Date(b.time)
  );

  const filteredScreenings = sortedScreenings.filter(screening => {
    const matchingMovie = movies.find(movie => movie.id === screening.movieId);
    if (!matchingMovie) return false;
    // Show all if "All" selected, otherwise filter by category
    return selectedCategory === "All" ||
      matchingMovie.description.categories.includes(selectedCategory);
  });

  const groupedScreenings = filteredScreenings.reduce((dateGroups, screening) => {
    // Formats date in ISO format ("2023-05-01")
    const dateKey = new Date(screening.time).toISOString().split('T')[0];
    if (!dateGroups[dateKey]) {
      dateGroups[dateKey] = [];
    }
    dateGroups[dateKey].push(screening);
    return dateGroups;
  }, {});

  return (
    <div>
      {/* Menu to filter by movie category */}
      <div style={{ margin: "1rem" }}>
        <Form.Group controlId="categorySelect">
          <Form.Label>Filter by Category</Form.Label>
          <Form.Select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
          >
            <option value="All">All</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </div>
      {
        Object.keys(groupedScreenings)
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
                      <Link to={'/booking/' + id}
                        style={{ textDecoration: 'none', color: 'inherit', fontWeight: 'normal' }}
                      >
                        <Screening
                          screeningTime={time}
                          auditoriumId={auditoriumId}
                          movie={matchingMovie}
                        />
                      </Link>
                    </div>
                  );
                })}
              </div>
            );
          })
      }
    </div>
  );
}