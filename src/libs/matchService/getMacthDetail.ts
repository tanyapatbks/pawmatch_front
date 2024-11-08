import { cookies } from 'next/headers'

export default async function getMacthDetail(petId: string) {
    const cookieStore = cookies();
    if (!cookieStore.has('user')) {
        throw new Error("user token required");
    }
    const jwt = cookieStore.get('user')?.value;
    const response = await fetch(`${process.env.NEXT_PUBLIC_PET_MATCH_SERVICE}/getMatchRequestDetail/${petId}`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${jwt}`
        }
});
    if (!response.ok) {
        throw new Error("Failed to Fetch Match Request Detail");
    }
    return await response.json();
}