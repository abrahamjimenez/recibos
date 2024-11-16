import { prisma } from "./index.ts";
import { type APIRoute } from "astro";
import type { Order } from "../../types/ReciptData.ts";

const getOrders = async () => {
  return prisma.order.findMany({
    include: {
      customer: true,
      payments: true,
    },
    take: 10,
  });
};

export const GET: APIRoute = async ({ params, request }) => {
  const result: Order[] = await getOrders();

  return new Response(
    JSON.stringify({
      result,
    }),
  );
};
