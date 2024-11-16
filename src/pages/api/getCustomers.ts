import { prisma } from "./index.ts";
import { type APIRoute } from "astro";

const getCustomers = async () => {
  return prisma.customer.findMany({});
};

export const GET: APIRoute = async () => {
  const data = await getCustomers();

  console.log(data);

  return new Response(
    JSON.stringify({
      message: `Data is ${data}`,
    }),
  );
};
