import { cookies } from 'next/headers'
export default async function sendMatch(data: FormData) {
  const cookieStore = cookies();
  if (!cookieStore.has('user')) {
    throw new Error("user token required");
  }
  const jwt = cookieStore.get('user')?.value;
  const response = await fetch(`${process.env.NEXT_PUBLIC_PET_MATCH_SERVICE}/sendMatchRequest`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${jwt}`,
    },
    body: data,
}
  );
  if (!response.ok) {
    throw new Error("Failed to Send Match Request");
  }
  return await response.json();
}
