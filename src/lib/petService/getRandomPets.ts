import PetRandomFilter from "@/types/index";
/*export default interface PetRandomFilter {
  species: string;
  gender: string;
  ageFrom: number;
  ageTo: number;
  vaccinatedComment: string;
} */
export default async function getRandomPets() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_GATEWAY}/pets/random`,
    {
      method: "GET",
      //   headers: {
      //     authorization: `Bearer ${token}`,
      //   },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to Fetch Pets");
  }
  return await response.json();
}
