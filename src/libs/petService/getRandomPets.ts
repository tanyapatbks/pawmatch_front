"use server"

import { cookies } from 'next/headers'
import { getToken } from 'next-auth/jwt';

export default async function getRandomPets() {
  const cookieStore = cookies();

  const token = await getToken({ req: { cookies: cookieStore }, secret: process.env.NEXTAUTH_SECRET });

  let response;

  if (!token) {
    response = await fetch(`${process.env.NEXT_PUBLIC_PET_SERVICE}/pets/random`, {
      method: "GET"
    });
  } else {
    const jwt = token.accessToken;
    
    response = await fetch(`${process.env.NEXT_PUBLIC_PET_SERVICE}/pets/random`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    });
  }

  if (!response.ok) {
    throw new Error("Failed to Get Random Pets");
  }
  
  const { data } = await response.json();

  return data;
}
