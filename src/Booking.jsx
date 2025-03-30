import { useState } from 'react'
import { useParams } from 'react-router'
import DisplayChairs from './DisplaySeats'

export default function Booking({ movies, screenings }) {
  const { screeningId } = useParams() // Extract screening ID from booking route
  const [selectedSeats, setSelectedSeats] = useState([]) // State to manage selected seats

  return (
    <div>
      <h1>Booking</h1>
      <DisplayChairs
        screeningId={screeningId}
        onSeatSelection={setSelectedSeats} // Pass the state setter function to child component
      />
    </div>
  )
}