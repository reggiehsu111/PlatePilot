import React from 'react'
import StarRating from '../../components/StarRating'

interface OpeningHours {
  Monday: string
  Tuesday: string
  Wednesday: string
  Thursday: string
  Friday: string
  Saturday: string
  Sunday: string
}

interface RestaurantInfoProps {
  isOpen: number
  name: string
  // openingHours: OpeningHours
  address: string
  stars: number
}

const formatOpeningHours = (hours: string): string => {
  if (hours === '0:0-0:0') return 'Closed'
  const [start, end] = hours.split('-').map((time) => {
    const [hrs, mins] = time.split(':').map(Number)
    const suffix = hrs >= 12 ? 'PM' : 'AM'
    const formattedHours = ((hrs + 11) % 12) + 1 // convert 24hr time to 12hr time
    return `${formattedHours}:${mins.toString().padStart(2, '0')} ${suffix}`
  })
  return `${start} - ${end}`
}

const RestaurantInfo: React.FC<RestaurantInfoProps> = ({
  isOpen,
  name,
  // openingHours,
  address,
  stars
}) => {
  const today = new Date().toLocaleString('en-US', { weekday: 'long' })
  // const todayHoursRaw = openingHours[today as keyof OpeningHours];
  // const todayHours = todayHoursRaw ? formatOpeningHours(todayHoursRaw) : 'Not available';
  const openStatusColor = isOpen ? 'bg-green-500' : 'bg-gray-300'
  return (
    <div className="space-y-4">
      {/* Restaurant Name */}
      <div className="flex items-center justify-start">
        <div className={`h-3 w-3 rounded-full ${openStatusColor} mr-2`}></div>
        <div className="text-lg">{`Restaurant Name: ${name}`}</div>
        {/* Include SVG for dropdown icon */}
      </div>

      {/* Address */}
      <div className="flex items-center justify-start">
        {/* Include SVG for location icon */}
        <div className="text-lg">{`Address: ${address}`}</div>
      </div>

      {/* Stars */}
      <div className="flex items-center justify-start">
        <StarRating stars={stars} />
      </div>
    </div>
  )
}

export default RestaurantInfo
