// src/libs/reviewService/getReviews.ts
"use server"

import { cookies } from 'next/headers'

interface Review {
  id: string;
  petId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
  isOwner: boolean;
}

interface ReviewResponse {
  reviews: Review[];
  isMatched: boolean;
  canReview: boolean;
}

export default async function getReviews(petId: string): Promise<ReviewResponse> {
  const cookieStore = cookies();
  const jwt = cookieStore.get('user')?.value;

  // Fetch reviews (public data)
  const reviewsResponse = await fetch(`${process.env.API_GATEWAY_URL}/reviews/${petId}`, {
    cache: 'no-store'
  });

  if (!reviewsResponse.ok) {
    throw new Error("Failed to fetch reviews");
  }

  const reviews: Review[] = await reviewsResponse.json();

  // ถ้าไม่มี token (ไม่ได้ login) จะดูได้อย่างเดียว
  if (!jwt) {
    return {
      reviews,
      isMatched: false,
      canReview: false
    };
  }

  try {
    // เช็คว่า matched หรือยัง
    const matchResponse = await fetch(`${process.env.API_GATEWAY_URL}/matches/status/${petId}`, {
      headers: {
        authorization: `Bearer ${jwt}`
      },
      cache: 'no-store'
    });

    if (!matchResponse.ok) {
      return {
        reviews,
        isMatched: false,
        canReview: false
      };
    }

    const { isMatched, userId } = await matchResponse.json();

    // เช็คว่าเคยรีวิวหรือยัง
    const hasReviewed = reviews.some(review => review.userId === userId);

    return {
      reviews: reviews.map(review => ({
        ...review,
        isOwner: review.userId === userId
      })),
      isMatched,
      canReview: isMatched && !hasReviewed
    };

  } catch (error) {
    console.error('Error checking match status:', error);
    return {
      reviews,
      isMatched: false,
      canReview: false
    };
  }
}