"use server"

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export default async function deleteReview(reviewId: string, petId: string, uid: string) {
  const cookieStore = cookies();

  if (!cookieStore.has('user')) {
    throw new Error("user token required");
  }

  const jwt = cookieStore.get('user')?.value;

  const response = await fetch(`${process.env.API_GATEWAY_URL}/reviews/${reviewId}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${jwt}`
    }
  });

  if (!response.ok) {
    throw new Error("Failed to Delete Review");
  }

  revalidatePath(`/matchdetail/${uid}/${petId}/reviews`, 'page')
}