import getRestaurants, { IRestaurantParams } from "./actions/getRestaurants";
import getCurrentUser from "./actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import RestaurantsCard from "./components/restaurants/RestaurantsCard";
import CustomPagination from "./components/Pagination";
import { EmptyStateMode } from "./types/constants";

interface HomeProps {
  searchParams: IRestaurantParams;
}

export default async function Home({ searchParams }: HomeProps) {
  // Get all the items
  let result;
  let restaurants = [];
  if (searchParams.category || searchParams.search || searchParams.page) {
    result = await getRestaurants(searchParams);
    restaurants = result.restaurants;
  } else {
    result = await getRestaurants({});
    restaurants = result.restaurants;
  }

  const currentUser = await getCurrentUser();

  const isHomeUrl = !searchParams.category && !searchParams.search;

  if (restaurants.length == 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No Items of this category"
          mode={EmptyStateMode.HOME}
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div className="pt-32 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-4 xl:gap-6">
          {restaurants.map((restaurant) => {
            return (
              <RestaurantsCard
                key={restaurant.id}
                data={restaurant}
                currentUser={currentUser}
              />
            );
          })}
        </div>
        <CustomPagination
          totalItemsCount={result.totalRestaurantsCount}
          isHomeUrl={isHomeUrl}
        />
      </Container>
    </ClientOnly>
  );
}
