export default async function getPet(pid: string) {
  console.log(`getPet at ${process.env.NEXT_PUBLIC_PET_SERVICE}/pets/${pid}`);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PET_SERVICE}/pets/${pid}`,
    {
      method: "GET",
      // headers: {
      //   authorization: `Bearer ${token}`,
      // },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to Fetch Pets");
  }
  return await response.json();
}
