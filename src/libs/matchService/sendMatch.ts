'use server'
import { cookies } from 'next/headers'
import { getToken } from 'next-auth/jwt';

interface MatchRequest {
  senderPetId: string,
  senderUserId: string,
  senderPetName: string,
  receiverPetId: string,
  receiverUserId: string,
  receiverPetName: string,
}

export default async function sendMatch(data: MatchRequest) {
  const cookieStore = cookies();

  const token = await getToken({ req: { cookies: cookieStore }, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    throw new Error("Not authenticated");
  }

  const jwt = token.accessToken;
  const sendData=JSON.stringify(data)
  const response = await fetch(`${process.env.NEXT_PUBLIC_PET_MATCH_SERVICE}/sendMatchRequest`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${jwt}`,
    },
    body: sendData,
}
  );
  if (!response.ok) {
    throw new Error("Failed to Send Match Request");
  }
  return await response.json();
}
