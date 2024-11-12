"use server"

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { getServerSession } from "next-auth";
import { ObjectId } from 'mongodb'

export default async function createReview(petId: string, content: string, uid: string) {
  try {
    const cookieStore = cookies();
    const sessionToken = cookieStore.get('next-auth.session-token')?.value;
    const session = await getServerSession();

    if (!sessionToken || !session?.user) {
      throw new Error("Authentication required");
    }

    const API_URL = process.env.API_GATEWAY_URL || 'http://localhost:5001/api';

    const reviewId = new ObjectId().toHexString(); // สร้าง reviewId ใหม่

    const requestBody = {
      reviewId, // เพิ่ม reviewId
      petId,
      content,
      uid,
      userId: uid,
      userName: session.user.name || 'Anonymous User',
      petName: "Unknown"
    };

    console.log('Sending review data:', requestBody); // Debug request body

    const response = await fetch(`${API_URL}/reviews`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionToken}`
      },
      body: JSON.stringify(requestBody),
      cache: 'no-store'
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error('Error creating review:', responseData);
      throw new Error(responseData?.message || "Failed to Create Review");
    }

    console.log('Review created successfully:', responseData);

    // Revalidate the reviews page
    revalidatePath(`/matchdetail/${uid}/${petId}/reviews`);

    return { success: true, reviewId };
  } catch (error) {
    console.error('Error in createReview:', error);
    throw error;
  }
}