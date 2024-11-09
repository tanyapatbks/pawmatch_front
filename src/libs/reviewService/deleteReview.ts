"use server"

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export default async function deleteReview(reviewId: string, petId: string) {
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
    throw new Error("You can only delete reviews for pets that you have matched with");
  }

  const response = await fetch(`${process.env.API_GATEWAY_URL}/reviews/${reviewId}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${jwt}`
    }
  });

  if (!response.ok) {
    throw new Error("Failed to Delete Review");
  }

  revalidatePath(`/pets/${petId}/reviews`, 'page')
}