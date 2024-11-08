
export async function getPet(petId: string) {

  const response = await fetch(`${process.env.API_GATEWAY_URL}/pets/${petId}`, {
    method: "GET",
    cache: 'no-store'
  });
  
  if (!response.ok) {
    throw new Error(`Failed to Fetch Pet ${petId}`);
  }

  const { data } = await response.json();
  
  return data;
}