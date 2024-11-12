"use server"

import { cookies } from 'next/headers'

export default async function getReview(reviewId: string) {
  try {
    const cookieStore = cookies();
    const sessionToken = cookieStore.get('next-auth.session-token')?.value;

    if (!sessionToken) {
      throw new Error("Authentication required");
    }

    const API_URL = process.env.API_GATEWAY_URL || 'http://localhost:5001/api';

    const response = await fetch(`${API_URL}/reviews/${reviewId}`, {
      headers: {
        'Authorization': `Bearer ${sessionToken}`
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error("Failed to fetch review");
    }

    return response.json();

  } catch (error) {
    console.error('Error in getReview:', error);
    throw error;
  }
}