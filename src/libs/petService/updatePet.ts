"use server"

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache';
import {getToken} from 'next-auth/jwt';

export default async function updatePet(petId: string, pet: FormData) {
  const cookieStore = cookies();

  const token = await getToken({ req: { cookies: cookieStore }, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    throw new Error("Not authenticated");
  }

  const jwt = token.accessToken;

  const response = await fetch(`${process.env.NEXT_PUBLIC_PET_SERVICE}/pets/${petId}`, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${jwt}`
    },
    body: pet,
  });

  if (!response.ok) {
    throw new Error("Failed to Update Pet");
  }

  revalidatePath('/mypets/[pid]/edit', 'page')
}
