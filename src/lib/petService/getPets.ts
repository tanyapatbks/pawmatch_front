export default async function getPets(token: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_PET_SERVICE}/pets`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to Fetch Pets");
  }
  return await response.json();
}
