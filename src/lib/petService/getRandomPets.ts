import PetRandomFilter from "@/types/index";
/*export default interface PetRandomFilter {
  species: string;
  gender: string;
  ageFrom: number;
  ageTo: number;
  vaccinatedComment: string;
} */
export default async function getRandomPets(filter: PetRandomFilter) {
  let fetchAPI = `${process.env.NEXT_PUBLIC_API_GATEWAY}/api/pets/randomPets?`;

  const queryParams = [];

  if (filter.species !== "") {
    queryParams.push(`species=${encodeURIComponent(filter.species)}`);
  }

  if (filter.gender !== "") {
    queryParams.push(`gender=${encodeURIComponent(filter.gender)}`);
  }

  if (filter.ageFrom !== undefined) {
    queryParams.push(`ageFrom=${filter.ageFrom}`);
  }

  if (filter.ageTo !== undefined) {
    queryParams.push(`ageTo=${filter.ageTo}`);
  }

  if (filter.vaccinatedComment !== "") {
    queryParams.push(
      `vaccinatedComment=${encodeURIComponent(filter.vaccinatedComment)}`
    );
  }

  fetchAPI += queryParams.join("&");

  const response = await fetch(fetchAPI, {
    method: "GET",
    //   headers: {
    //     authorization: `Bearer ${token}`,
    //   },
  });
  if (!response.ok) {
    throw new Error("Failed to Fetch Pets");
  }
  return await response.json();
}
