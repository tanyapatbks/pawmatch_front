export default async function getUserProfile(token: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_GATEWAY}/api/auth/login`,
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to Fetch User Profile");
  }
  return await response.json();
}
