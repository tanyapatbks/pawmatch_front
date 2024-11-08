"use server"

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache';

export default async function updatePet(petId: string, pet: FormData) {
  const cookieStore = cookies();

  if (!cookieStore.has('user')) {
    throw new Error("user token required");
  }

  const jwt = cookieStore.get('user')?.value;

  console.log(pet);

  const response = await fetch(`${process.env.API_GATEWAY_URL}/pets/${petId}`, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${jwt}`
    },
    body: pet,
  });

  if (!response.ok) {
    throw new Error("Failed to Update Pet");
  }

  revalidatePath('/mypets/[pid]/edit')
}
