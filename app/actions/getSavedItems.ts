import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getSavedRestaurants() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return [];
    }

    let query: any = {
      id: {
        in: [...(currentUser.favoriteIds || [])]
      }
    }

    const savedRestaurants = await prisma.restaurant.findMany({
      where: query,
    })

    const safeSavedRestaurants = savedRestaurants.map((saved) => ({
      ...saved,
    }))

    return safeSavedRestaurants;
  } catch (error: any) {
    throw new Error(error);
  }
}
