import type { APIRoute } from "astro";
import { prisma } from "./index.ts";

const updateOrderBalance = async (balanceDue: number, orderId: number) => {
  return prisma.order.update({
    where: {
      orderId,
    },
    data: {
      balanceDue: balanceDue,
    },
  });
};

export const PATCH: APIRoute = async ({ request }) => {
  const { balanceDue, orderId }: { balanceDue: number; orderId: number } =
    await request.json();

  await updateOrderBalance(balanceDue, orderId);

  return new Response(
    JSON.stringify({
      message: "This was a PATCH!",
      balanceDue,
      orderId,
    }),
  );
};
