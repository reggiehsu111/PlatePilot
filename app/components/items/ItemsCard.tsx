'use client'

import { SafeUser, SafeItem } from "@/app/types";
import { Reservation } from "@prisma/client";
import Image from "next/image";
import SaveButton from "../SaveButton";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";
import Button from "../Button"
import Avatar from "../Avatar";
import { CardMode } from "@/app/types/constants";



interface ItemsCardProps {
  data: SafeItem & {
    user: SafeUser;
  };
  reservation?: Reservation & {
    item: SafeItem & {
      user: SafeUser
    };
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  onAction?: (id: string) => void;
  mode?: CardMode;
}


const ItemsCard: React.FC<ItemsCardProps> = ({ data, reservation, currentUser, disabled, actionLabel, actionId="", onAction, mode }) => {
  const isSold = mode === CardMode.SOLD
  // Wrapper element for disabling link
  const WrapperElement = isSold ? 'div' : 'a'

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      if (disabled) return
      onAction?.(actionId)
    },
    [onAction, actionId, disabled]
  )

  const reservationDate = useMemo(() => {
    if (!reservation) return null
    const pickup = new Date(reservation.pickupDate)

    return `${format(pickup, 'PP')}`
  }, [reservation])

  const reservationTime = useMemo(() => {
    if (!reservation) return null
    const pickup = new Date(reservation.pickupDate)

    return `${format(pickup, 'p')}`
  }, [reservation])

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col gap-2 w-full">
        <WrapperElement
          href={isSold ? undefined : `/items/${data.id}`}
          className="col-span-1 cursor-pointer group h-full"
          onClick={isSold ? (e) => e.preventDefault() : undefined}
        >
          <div className="aspect-square w-full relative overflow-hidden rounded-2xl">
            <Image
              fill
              alt={data.title}
              src={data.image}
              className="object-cover h-full w-full group-hover:scale-110 transition"
            />
            {isSold && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Image fill alt="sold overlay" src="/images/platepilot.png"
                  className="object-contain object-center w-full h-full" />
              </div>
            )}
          </div>
        </WrapperElement>
        <div className="relative">
          <WrapperElement
            href={isSold ? undefined : `/items/${data.id}`}
            className="col-span-1 cursor-pointer group h-full"
            onClick={isSold ? (e) => e.preventDefault() : undefined}
          >
            <div className="flex items-start">
              <div className="w-5/6 font-bold text-lg">{data.title}</div>
            </div>
            <div className="text-neutral-500">{data.category}</div>
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row justify-start gap-1">
                <div className="flex font-bold text-green-600">$</div>
                <div className="flex">
                  {data.price === 0 ? 'FREE' : data.price}
                </div>
              </div>
              <div className="pb-2">
                <Avatar small src={data.user?.image} />{' '}
              </div>
            </div>
          </WrapperElement>
          <div className="absolute top-1 right-1">
            <SaveButton small itemId={data.id} currentUser={currentUser} />
          </div>
        </div>

        {/* Reservation Info */}
        {(mode == CardMode.ORDER || mode == CardMode.PROFILE_RESERVED_SOLD) && (
          <div className="flex flex-col justify-start">
            <div>Pickup Info</div>
            <div className="flex flex-row justify-between">
              <div>Date: </div>
              <div className="text-red-500 font-semibold">
                {reservationDate}
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <div>Time: </div>
              <div className="text-red-500 font-semibold">
                {reservationTime}
              </div>
            </div>
          </div>
        )}

        {/* Buyer Info */}
        {mode == CardMode.PROFILE_RESERVED_SOLD && reservation?.user && (
          <div className="flex flex-col justify-start">
            <div>Buyer Info</div>
            <div className="flex flex-row justify-between gap-2">
              <div>Name: </div>
              <div className="flex text-right">{reservation.user.name}</div>
            </div>
          </div>
        )}

        {/* Seller Info */}
        {mode == CardMode.ORDER && reservation?.item.user && (
          <div className="flex flex-col justify-start">
            <div>Seller Info</div>
            <div className="flex flex-row justify-between gap-2">
              <div>Name: </div>
              <div className="flex text-right">
                {reservation.item.user.name}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Button */}
      <div className="flex mt-auto">
        {(mode == CardMode.PROFILE_ALL ||
          mode == CardMode.PROFILE_RESERVED_SOLD) &&
          onAction &&
          actionLabel && (
            <Button
              disabled={disabled}
              small
              label={actionLabel}
              onClick={handleCancel}
            />
          )}
      </div>
    </div>
  )
};

export default ItemsCard
