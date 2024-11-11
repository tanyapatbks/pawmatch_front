"use server"

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export default async function createReview(petId: string, content: string, uid: string) {
  const cookieStore = cookies();

  if (!cookieStore.has('user')) {
    throw new Error("user token required");
  }

  const jwt = cookieStore.get('user')?.value;

  const response = await fetch(`${process.env.API_GATEWAY_URL}/reviews`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${jwt}`
    },
    body: JSON.stringify({
      petId,
      content,
      uid
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to Create Review");
  }

  revalidatePath(`/matchdetail/${uid}/${petId}/reviews`, 'page')
}