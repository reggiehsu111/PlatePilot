'use client'

import { SafeItem, SafeUser, SafeRestaurant } from "@/app/types";
import { Reservation } from "@prisma/client";
import { useMemo, useCallback } from "react";
import { categories } from "@/app/components/navbar/Categories";
import Container from "@/app/components/Container";
import Footer from '@/app/components/Footer'
import UpdateButton from '@/app/components/UpdateButton'
import ItemHeading from "@/app/components/items/ItemHeading";
import ItemInfo from "@/app/components/items/ItemInfo";
import ItemAdditionalPhoto from "@/app/components/items/ItemAdditionalPhoto";

import ItemReservation from "@/app/components/items/ItemReservation";
import useLoginModal from "@/app/hooks/useLoginModal";
import useEditSellModal from "@/app/hooks/useEditSellModal";
import EditSellModal from "@/app/components/modals/EditSellModal";
import useSellModal from "@/app/hooks/useSellModal";
import useReserveModal from "@/app/hooks/useReserveModal";

interface ItemClientProps {
  reservations?: Reservation[]
  restaurant: SafeRestaurant
  currentUser?: SafeUser | null
}

const ItemClient: React.FC<ItemClientProps> = ({
  reservations,
  restaurant,
  currentUser
}) => {
  const loginModal = useLoginModal()
  const editSellModal = useEditSellModal()

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

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-8">
          <h1 className="text-2xl font-bold">{restaurant.name}</h1>
        </div>
      </div>
    </Container>
  )
}

export default ItemClient
