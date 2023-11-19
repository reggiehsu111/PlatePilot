import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import Container from "@/app/components/Container";
import Heading from "../components/Heading";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getSavedRestaurants from "../actions/getSavedItems";
import SavedRestaurantsClient from "./SavedClient";
import { EmptyStateMode } from "../types/constants";

const SavedItemPage = async () => {
  const restaurants = await getSavedRestaurants();
  const currentUser = await getCurrentUser();
  if (restaurants.length === 0) { 
    return (
      <ClientOnly>
        <Container>
          <div className="py-6">
            <Heading title="SAVED ITEMS" />
            <EmptyState
              title="No saved items"
              mode={EmptyStateMode.FULL_PAGE}
            />
          </div>
        </Container>
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <SavedRestaurantsClient restaurants={restaurants} currentUser={currentUser} />
    </ClientOnly>
  )
}

export default SavedItemPage;