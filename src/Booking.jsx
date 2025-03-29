import { useState } from 'react'
import { useParams } from 'react-router'
import DisplayChairs from './DisplaySeats'

export default function Booking({ movies, screenings }) {
  const { screeningId } = useParams() // Extract screening ID from booking route

}