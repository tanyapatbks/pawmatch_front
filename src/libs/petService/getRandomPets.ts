export default async function getRandomPets(token?: string) {
  console.log(
    "getRandomPets at",
    process.env.NEXT_PUBLIC_PET_SERVICE,
    "/pets/random"
  );
  if (!token) {
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
  } else {
    const response = await fetch(
      //${process.env.NEXT_PUBLIC_PET_SERVICE}
      `${process.env.NEXT_PUBLIC_PET_SERVICE}/pets/random`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to Fetch Pets");
    }
    return await response.json();
  }
}
