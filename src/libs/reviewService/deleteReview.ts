"use server"

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export default async function deleteReview(reviewId: string, petId: string, uid: string) {
  try {
    const cookieStore = cookies();
    const sessionToken = cookieStore.get('next-auth.session-token')?.value;

    if (!sessionToken) {
      throw new Error("Authentication required");
    }

    const API_URL = process.env.NEXT_PUBLIC_REVIEW_SERVICE || 'http://localhost:5001/api';

    const response = await fetch(`${API_URL}/reviews/${reviewId}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${sessionToken}`
      }
    });

    if (!response.ok) {
      throw new Error("Failed to delete review");
    }

    revalidatePath(`/matchdetail/${uid}/${petId}/reviews`);

  } catch (error) {
    console.error('Error in deleteReview:', error);
    throw error;
  }
}