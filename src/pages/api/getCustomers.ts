import { prisma } from "./index.ts";
import type { APIRoute } from "astro";

export interface GetCustomersResultData {
  customerId: number;
  name: string;
  address: string;
  city: string;
  phone: string;
}

const getCustomers = async (phone: string) => {
  return prisma.customer.findMany({
    where: {
      phone: {
        contains: phone,
      },
    },
  });
};

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { phone }: { phone: string } = body;

  const result = await getCustomers(phone);

  return new Response(
    JSON.stringify({
      result,
    }),
  );
};
