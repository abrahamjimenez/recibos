import type { APIRoute } from "astro";
import { prisma } from "./index.ts";

const getAllCustomers = () => {
  return prisma.customer.findMany({});
};

export const GET: APIRoute = async () => {
  const result = await getAllCustomers();

  return new Response(
    JSON.stringify({
      result,
    }),
  );
};
