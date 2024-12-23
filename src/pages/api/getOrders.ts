import { prisma } from "./index.ts";
import { type APIRoute } from "astro";
import type { Order } from "../../types/ReciptData.ts";

const getOrders = async () => {
  return prisma.order.findMany({
    take: 10,
  });
};

export const GET: APIRoute = async () => {
  const result: Order[] = await getOrders();

  return new Response(
    JSON.stringify({
      result,
    }),
  );
};
