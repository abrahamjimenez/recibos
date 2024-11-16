import type { APIRoute } from "astro";
import { prisma } from "./index.ts";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();

  // Customer
  const name = data.get("name") as string;
  const address = data.get("address") as string;
  const city = data.get("city") as string;
  const phone = data.get("phone") as string;
  // Order
  const orderDateReceived = data.get("orderDateReceived") as string;
  const orderDatePromised = data.get("orderDatePromised") as string;
  const remarks = data.get("remarks") as string;
  const totalCharges = data.get("totalCharges") as string;
  const deposit = data.get("deposit") as string;
  const balanceDue = data.get("balanceDue") as string;
  // Payment
  const paymentMethod = data.get("paymentMethod") as string;
  const amount = data.get("amount") as string;
  const paymentDateReceived = data.get("paymentDateReceived") as string;

  const customerResult = await prisma.customer.create({
    data: {
      name: name,
      address: address,
      city: city,
      phone: phone,
    },
  });

  const orderResult = await prisma.order.create({
    data: {
      customerId: customerResult.customerId,
      dateReceived: orderDateReceived,
      datePromised: orderDatePromised,
      remarks: remarks,
      totalCharges: parseFloat(totalCharges),
      deposit: parseFloat(deposit),
      balanceDue: parseFloat(balanceDue),
    },
  });

  const paymentResult = await prisma.payment.create({
    data: {
      orderId: orderResult.orderId,
      paymentMethod: paymentMethod,
      amount: parseFloat(amount),
      dateReceived: paymentDateReceived,
    },
  });

  return new Response(
    JSON.stringify({
      customerResult,
      orderResult,
      paymentResult,
    }),
  );
};
