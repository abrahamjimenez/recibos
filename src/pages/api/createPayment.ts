import type { APIRoute } from "astro";
import { prisma } from "./index.ts";
import { getCurrentDateTimeFormatted } from "../../utils/dateUtils.ts";

// todo the amount, should also subtract from the order balance due
// todo maybe i need another query? This one is create so idk... maybe it'll allow update
const createPayment = async (amount: number) => {
  return prisma.payment.create({
    data: {
      orderId: 12,
      paymentMethod: "Cash",
      amount: amount,
      dateReceived: getCurrentDateTimeFormatted(),
    },
    include: {
      order: true,
    },
  });
};

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const amount = data.get("amount") as string;

  await createPayment(parseFloat(amount));

  return new Response(
    JSON.stringify({
      message: "This was a POST!",
    }),
  );
};
