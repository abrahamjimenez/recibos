import type { APIRoute } from "astro";
import { prisma } from "./index.ts";
import { getCurrentDateTime } from "../../utils/dateUtils.ts";

const createPayment = async (amount: number, orderId: number) => {
  return prisma.payment.create({
    data: {
      orderId: orderId,
      paymentMethod: "Cash",
      amount: amount,
      dateReceived: getCurrentDateTime(),
    },
    include: {
      order: true,
    },
  });
};

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const amount = data.get("amount") as string;
  const orderId = data.get("orderId") as string;

  await createPayment(parseFloat(amount), parseFloat(orderId));

  return new Response(
    JSON.stringify({
      message: "This was a POST!",
    }),
  );
};
