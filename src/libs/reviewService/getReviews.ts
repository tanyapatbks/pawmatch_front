"use server"

import { cookies } from 'next/headers'

interface Review {
  reviewId: string;   // ใช้ reviewId เป็นหลัก
  petId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
}

interface ReviewResponse {
  reviews: Review[];
}

export default async function getReviews(petId: string, uid: string): Promise<ReviewResponse> {
  try {
    const API_URL = process.env.NEXT_PUBLIC_REVIEW_SERVICE || 'http://localhost:5001/api';
    
    const response = await fetch(`${API_URL}/reviews/${petId}`, {
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch reviews');
    }

    const reviews = await response.json();
    return { reviews };

  } catch (error) {
    console.error('Error in getReviews:', error);
    return { reviews: [] };
  }
}