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
  canReview: boolean;
}

export default async function getReviews(petId: string, uid: string): Promise<ReviewResponse> {
  const cookieStore = cookies();
  const jwt = cookieStore.get('user')?.value;

  const reviewsResponse = await fetch(`${process.env.API_GATEWAY_URL}/reviews/${petId}`, {
    cache: 'no-store'
  });

  if (!reviewsResponse.ok) {
    throw new Error("Failed to fetch reviews");
  }

  const reviews: Review[] = await reviewsResponse.json();
  const currentUserId = jwt ? /* get user id from jwt */ '' : null;

  // ถ้าไม่มี token จะดูได้อย่างเดียว
  if (!jwt) {
    return {
      reviews,
      canReview: false
    };
  }

  // เช็คว่าเคยรีวิวหรือยัง
  const hasReviewed = reviews.some(review => review.userId === currentUserId);

  return {
    reviews: reviews.map(review => ({
      ...review,
      isOwner: review.userId === currentUserId
    })),
    canReview: !hasReviewed
  };
}