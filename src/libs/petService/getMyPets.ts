
import { cookies } from 'next/headers'

export async function getMyPets() {
  const cookieStore = cookies();

  if (!cookieStore.has('user')) {
    throw new Error("user token required");
  }

  const jwt = cookieStore.get('user')?.value;
  
  const response = await fetch(`${process.env.API_GATEWAY_URL}/pets/user`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${jwt}`,
    },
  });
  
  if (!response.ok) {
    throw new Error("Failed to Fetch Pets");
  }

  const { data } = await response.json();
  
  return data;
}