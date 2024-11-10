export default async function getUser(userId: string) {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/getUser?userId=${userId}`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error("Failed to get user");
  }
  return await response.json();
}