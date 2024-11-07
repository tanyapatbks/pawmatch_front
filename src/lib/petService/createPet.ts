"use server"

import { cookies } from 'next/headers'

export default async function createPet(pet: FormData) {
  const cookieStore = cookies();

  if (!cookieStore.has('user')) {
    throw new Error("user token required");
  }

  const jwt = cookieStore.get('user')?.value;
  
  const response = await fetch(`${process.env.API_GATEWAY_URL}/pets`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${jwt}`
    },
    body: pet,
  });

  if (!response.ok) {
    throw new Error("Failed to Create Pet");
  }
}
