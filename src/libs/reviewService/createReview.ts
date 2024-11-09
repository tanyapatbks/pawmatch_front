"use server"

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export default async function createReview(petId: string, content: string) {
  const cookieStore = cookies();

  if (!cookieStore.has('user')) {
    throw new Error("user token required");
  }

  const jwt = cookieStore.get('user')?.value;

  // ตรวจสอบสถานะ match ก่อนสร้าง review
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
    throw new Error("You can only review pets that you have matched with");
  }

  const response = await fetch(`${process.env.API_GATEWAY_URL}/reviews`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${jwt}`
    },
    body: JSON.stringify({
      petId,
      content
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to Create Review");
  }

  revalidatePath(`/pets/${petId}/reviews`, 'page')
}