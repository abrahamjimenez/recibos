import type { APIRoute } from "astro";
import { prisma } from "./index.ts";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();

  const name = data.get("name") as string;
  const address = data.get("address") as string;
  const city = data.get("city") as string;
  const phone = data.get("phone") as string;

  const result = await prisma.customer.create({
    data: {
      name: name,
      address: address,
      city: city,
      phone: phone,
    },
  });

  return new Response(
    JSON.stringify({
      message: "This was a POST!",
    }),
  );
};
