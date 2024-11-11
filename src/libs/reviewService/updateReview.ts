"use server"

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export default async function updateReview(reviewId: string, petId: string, content: string, uid: string) {
  const cookieStore = cookies();

  if (!cookieStore.has('user')) {
    throw new Error("user token required");
  }

  const jwt = cookieStore.get('user')?.value;

  const response = await fetch(`${process.env.API_GATEWAY_URL}/reviews/${reviewId}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${jwt}`
    },
    body: JSON.stringify({ content }),
  });

  if (!response.ok) {
    throw new Error("Failed to Update Review");
  }

  revalidatePath(`/matchdetail/${uid}/${petId}/reviews`, 'page')
}