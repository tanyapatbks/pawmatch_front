"use server"

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export default async function updateReview(reviewId: string, petId: string, content: string) {
  const cookieStore = cookies();

  if (!cookieStore.has('user')) {
    throw new Error("user token required");
  }

  const jwt = cookieStore.get('user')?.value;

  // เช็คสถานะ match
  const matchResponse = await fetch(`${process.env.API_GATEWAY_URL}/matches/status/${petId}`, {
    headers: {
      authorization: `Bearer ${jwt}`
    }
  });

  if (!matchResponse.ok) {
    throw new Error("Failed to verify match status");
  }

  const { isMatched } = await matchResponse.json();
  if (!isMatched) {
    throw new Error("You can only edit reviews for pets that you have matched with");
  }

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

  revalidatePath(`/pets/${petId}/reviews`, 'page')
}