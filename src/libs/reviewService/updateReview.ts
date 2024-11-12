"use server"

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export default async function updateReview(reviewId: string, content: string, petId: string, uid: string) {
  try {
    const cookieStore = cookies();
    const sessionToken = cookieStore.get('next-auth.session-token')?.value;

    if (!sessionToken) {
      throw new Error("Authentication required");
    }

    const API_URL = process.env.NEXT_PUBLIC_REVIEW_SERVICE || 'http://localhost:5001/api';

    const response = await fetch(`${API_URL}/reviews/${reviewId}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionToken}`
      },
      body: JSON.stringify({ content })
    });

    if (!response.ok) {
      throw new Error("Failed to update review");
    }

    revalidatePath(`/matchdetail/${uid}/${petId}/reviews`);
    redirect(`/matchdetail/${uid}/${petId}/reviews`);

  } catch (error) {
    console.error('Error in updateReview:', error);
    throw error;
  }
}