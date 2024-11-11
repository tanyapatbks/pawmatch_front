export default async function getPet(petId: string) {

  // console.log(
  //   `fetching pet ${petId} from ${process.env.NEXT_PUBLIC_PET_SERVICE}/pets/${petId}`
  // );
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PET_SERVICE}/pets/${petId}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to Fetch Pet ${petId}`);
  }

  // const { data } = await response.json();

  // return data;

  return await response.json();
}
