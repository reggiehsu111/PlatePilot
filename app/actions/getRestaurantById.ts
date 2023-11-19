import prisma from "@/app/libs/prismadb";

interface IParams {
  restaurantId?: string;
}

export default async function getRestaurantById(params: IParams) {
  try {
    const { restaurantId } = params;
    const restaurant = await prisma.restaurant.findUnique({
      where: {
        id: restaurantId,
      },
    });
    if (!restaurant) {
      return null;
    }
    return {
      ...restaurant,
    };
    console.log("restaurant:", restaurant);
  } catch (error: any) {
    throw new Error(error);
  }
}
