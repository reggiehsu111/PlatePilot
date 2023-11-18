import prisma from "@/app/libs/prismadb";

export interface IRestaurantParams {
  category?: string;
  search?: string;
  page?: number;
  pageSize?: number;
}

export default async function getRestaurants(params: IRestaurantParams) {
  try {
    const { category, search = "", page = 1, pageSize = 60 } = params;

    let query: any = {};

    if (category) {
      query.category = category;
    }

    if (search) {
      query = {
        ...query,
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { category: { contains: search, mode: "insensitive" } },
        ],
      };
    }

    const totalRestaurantsCount = await prisma.restaurant.count({
      where: query,
    });

    const restaurants = await prisma.restaurant.findMany({
      skip: page ? (page - 1) * pageSize : 0,
      take: pageSize,
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeItems = restaurants.map((restaurant) => ({
      ...restaurant,
    }));
    return { restaurants: safeItems, totalRestaurantsCount, query: query };
  } catch (error: any) {
    throw new Error(error);
  }
}
