'use client'

import { SafeItem, SafeUser, SafeRestaurant } from '@/app/types'
import { Reservation } from '@prisma/client'
import { useState, useMemo, useCallback } from 'react'
import { categories } from '@/app/components/navbar/Categories'
import Container from '@/app/components/Container'
import Footer from '@/app/components/Footer'
import UpdateButton from '@/app/components/UpdateButton'
import RestaurantInfo from './RestaurantInfo'

import useLoginModal from '@/app/hooks/useLoginModal'
import useEditSellModal from '@/app/hooks/useEditSellModal'
import EditSellModal from '@/app/components/modals/EditSellModal'
import useSellModal from '@/app/hooks/useSellModal'
import useReserveModal from '@/app/hooks/useReserveModal'

import { Map } from '@/app/components/Map'
interface ItemClientProps {
  reservations?: Reservation[]
  restaurant: SafeRestaurant
  currentUser?: SafeUser | null
}
const TABS = [
  'Service',
  'Food Quality',
  'Price',
  'Transportation',
  'Restaurant Environment'
]

const ItemClient: React.FC<ItemClientProps> = ({
  reservations,
  restaurant,
  currentUser
}) => {
  const loginModal = useLoginModal()
  const editSellModal = useEditSellModal()

  const [activeTab, setActiveTab] = useState(TABS[0])
  const handleTabClick = (tabName: any) => {
    setActiveTab(tabName)
  }

  const onEdit = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen()
    }

    // open the reserve confirm modal
    editSellModal.onOpen()
  }, [currentUser, loginModal, editSellModal])

  const category = useMemo(() => {
    return categories.find(
      (restaurants) => restaurants.label === restaurant.category
    )
  }, [restaurant.category])

  interface OpeningHours {
    Monday: string
    Tuesday: string
    Wednesday: string
    Thursday: string
    Friday: string
    Saturday: string
    Sunday: string
  }
console.log(restaurant.hours);
// const openingHours: OpeningHours = restaurant.hours as OpeningHours;
  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col pt-10 gap-8">
          {/* Images */}

          {/* Name and Map */}
          <div className="grid grid-cols-1 md:grid-cols-12 md:gap-10">
            <div className="col-span-7">
              <RestaurantInfo
                isOpen={restaurant.is_open || 0}
                name={restaurant.name ?? ''}
                // openingHours={openingHours}
                address={
                  restaurant.address +
                  ', ' +
                  restaurant.city +
                  ', ' +
                  restaurant.state +
                  ', ' +
                  restaurant.postal_code
                }
                stars={restaurant.stars || 0}
              />
            </div>

            {/* Google Maps - Colin */}
            <div className="col-span-5">
              <Map />
            </div>
          </div>

          {/* Tabs for Reviews */}
          <div className="flex flex-col">
            <div className="flex mb-4">
              {TABS.map((tabName) => (
                <button
                  key={tabName}
                  onClick={() => handleTabClick(tabName)}
                  className={`px-4 py-2 rounded-xl ${
                    activeTab === tabName ? 'bg-gray-200' : ''
                  }`}
                >
                  {tabName}
                </button>
              ))}
            </div>
            <div className="flex-grow">
              {activeTab === 'Service' && <p>Content for Service</p>}
              {activeTab === 'Food Quality' && <p>Content for Food Quality</p>}
              {activeTab === 'Price' && <p>Content for Price</p>}
              {activeTab === 'Transportation' && (
                <p>Content for Food Quality</p>
              )}
              {activeTab === 'Restaurant Environment' && (
                <p>Content for Restaurant Environment</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ItemClient
