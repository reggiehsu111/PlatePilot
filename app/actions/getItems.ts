import prisma from "@/app/libs/prismadb";

export interface IItemsParams {
  userId?: string;
  category?: string;
  search?: string;
  page?: number;
  pageSize?: number;
}

export default async function getItems(params: IItemsParams) {
  try {
    const { userId, category, search = "", page = 1, pageSize = 60 } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }

    if (search) {
      query = {
        ...query,
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { category: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      };
    }

    query.reservation = null;

    const totalItemsCount = await prisma.item.count({
      where: query,
    });

    const items = await prisma.item.findMany({
      skip: page ? (page - 1) * pageSize : 0,
      take: pageSize,
      where: query,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
      },
    });

    const safeItems = items.map((item) => ({
      ...item,
      user: {
        ...item.user,
        createdAt: item.user.createdAt.toISOString(),
        updatedAt: item.user.updatedAt.toISOString(),
        emailVerified: item.user.emailVerified
          ? item.user.emailVerified.toISOString()
          : null,
      },
      createdAt: item.createdAt.toISOString(),
    }));
    return { items: safeItems, totalItemsCount, query: query };
  } catch (error: any) {
    throw new Error(error);
  }
}
