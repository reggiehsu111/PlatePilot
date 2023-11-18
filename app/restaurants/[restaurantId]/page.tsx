import getRestaurantById from '@/app/actions/getRestaurantById'
import getCurrentUser from '@/app/actions/getCurrentUser';
import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';
import RestaurantClient from './RestaurantClient'
import { EmptyStateMode } from '@/app/types/constants';

interface IParams {
  restaurantId?: string
}

const ItemPage =  async ({params} : {params : IParams}) => {
  const restaurant = await getRestaurantById(params)
  const currentUser = await getCurrentUser();

  if (!restaurant) {
    return (
      <ClientOnly>
        <EmptyState
          title="Error: Item not found"
          mode={EmptyStateMode.FULL_PAGE}
        />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      {restaurant.name}
      <RestaurantClient restaurant={restaurant} currentUser={currentUser} />
    </ClientOnly>
  )
}

export default ItemPage;