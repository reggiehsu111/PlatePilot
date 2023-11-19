import { User, Item, Reservation, Restaurant, Review } from '@prisma/client'

export type SafeItem = Omit<Item, 'createdAt'> & {
  createdAt: string
}

export type SafeRestaurant = Omit<Restaurant, 'createdAt'> & {
  // createdAt: string
}

export type SafeReview = Omit<Review, 'createdAt'> & {}

export type SafeUser = Omit<
  User,
  'createdAt' | 'updatedAt' | 'emailVerified'
> & {
  createdAt: string
  updatedAt: string
  emailVerified: string | null | undefined
}


export type SafeReservation = Omit<
  Reservation,
  "createdAt" | "pickupDate" | "item"
> & {
  createdAt: string;
  pickupDate: string;
  item: SafeItem;
};