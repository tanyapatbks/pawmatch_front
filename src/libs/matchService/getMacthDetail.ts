'use server'
import { cookies } from 'next/headers'
import { getToken } from 'next-auth/jwt'
export default async function getMacthDetail() {
    const cookieStore = cookies();
    const token = await getToken({ req: { cookies: cookieStore }, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
        throw new Error("Not authenticated");
    }

    const jwt = token.accessToken;
    const response = await fetch(`${process.env.NEXT_PUBLIC_PET_MATCH_SERVICE}/getMatchRequestDetail`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${jwt}`
        }
    });
    if (!response.ok) {
        throw new Error("Failed to Fetch Match Request Detail");
    }
    return await response.json();
}