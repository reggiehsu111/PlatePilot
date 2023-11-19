import { SafeItem, SafeUser, SafeRestaurant } from "@/app/types";

import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
// import ItemsCard from "@/app/components/items/ItemsCard";
import RestaurantsCard from "../components/restaurants/RestaurantsCard";

interface SavedRestaurantsClientProps {
  restaurants: SafeRestaurant[];
  currentUser?: SafeUser | null;
}

const SavedRestaurantsClient: React.FC<SavedRestaurantsClientProps> = ({
  restaurants,
  currentUser,
}) => {
  return (
    <Container>
      <div className="py-6">
        <Heading title="SAVED RESTAURANTS" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-4 xl:gap-6">
          {restaurants.map(
            (restaurant: any) =>
              <RestaurantsCard
                key={restaurant.id}
                currentUser={currentUser}
                data={restaurant}
              />
          )}
        </div>
      </div>
    </Container>
  )
};

export default SavedRestaurantsClient;
