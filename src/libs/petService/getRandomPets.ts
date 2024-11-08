export default async function getRandomPets() {
  console.log(
    "getRandomPets at",
    process.env.NEXT_PUBLIC_PET_SERVICE,
    "/pets/random"
  );
  const response = await fetch(
    //${process.env.NEXT_PUBLIC_PET_SERVICE}
    `${process.env.NEXT_PUBLIC_PET_SERVICE}/pets/random`,
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
