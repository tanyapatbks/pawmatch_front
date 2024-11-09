"use server"

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache';

export default async function deletePet(petId: string) {
  const cookieStore = cookies();

  if (!cookieStore.has('user')) {
    throw new Error("user token required");
  }

  const jwt = cookieStore.get('user')?.value;

  const response = await fetch(`${process.env.NEXT_PUBLIC_PET_SERVICE}/pets/${petId}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${jwt}`
    }
  });

  if (!response.ok) {
    throw new Error("Failed to Update Pet");
  }

  revalidatePath('/mypets', 'page')
}
