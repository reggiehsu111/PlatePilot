import React from 'react'
import StarRating from '../../components/StarRating'

import {
  MdOutlineHouse,
  MdOutlineCalendarToday,
  MdOutlineFoodBank
} from 'react-icons/md'
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
  categories: any
  openingHours: object
  address: string
  stars: number
}

const formatOpeningHours = (hours: string): string => {
  if (hours === '0:0-0:0' || hours == 'Closed') return 'Closed'
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
  categories,
  openingHours,
  address,
  stars
}) => {
  const today = new Date().toLocaleString('en-US', { weekday: 'long' })
  const openStatusColor = isOpen ? 'bg-green-500' : 'bg-gray-300'

  console.log(categories)


  return (
    <div className="space-y-2">
      {/* Restaurant Name */}
      <div className="flex items-center justify-start">
        <div className={`h-3 w-3 rounded-full ${openStatusColor} mr-2`}></div>
        <div className="text-3xl font-bold">{name}</div>
        {/* Include SVG for dropdown icon */}
      </div>

      {/* Stars */}
      <div className="flex items-center justify-start">
        <StarRating stars={stars} />
      </div>

      {/* Address */}
      <div className="flex items-center justify-start gap-2">
        {/* Include SVG for location icon */}
        <MdOutlineHouse size={26} />
        <div className="text-lg">{address}</div>
      </div>

      {/* Category */}
      <div className="flex items-center justify-start gap-2">
        <MdOutlineFoodBank size={26} />
        <div className="text-lg">{categories}</div>
      </div>

      {/* Opening Hours for the Week */}
      <div className="flex flex-col gap-2 text-lg">
        <div className="flex flex-row gap-2 items-center">
          <MdOutlineCalendarToday size={26} />
          <div className="flex">Opening Hours: </div>
        </div>
        <ul>
          {Object.entries(openingHours).map(([day, hours]) => (
            <li key={day} className="flex">
              {/* Adding margin to the right of the day name span */}
              <span className="pl-6 flex-none w-20 font-semibold mr-10">
                {day}
              </span>
              <span>: {hours ? formatOpeningHours(hours) : 'Closed'}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default RestaurantInfo
