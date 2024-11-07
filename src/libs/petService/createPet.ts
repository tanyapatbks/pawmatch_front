import PetFullDetail from "@/types/index";

export default async function createPet(token: string, pet: PetFullDetail) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_PET_SERVICE}/pets`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pet),
  });
  if (!response.ok) {
    throw new Error("Failed to Create Pet");
  }
  return await response.json();
}
