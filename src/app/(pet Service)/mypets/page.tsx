
import MyPetCard from "@/components/PetCard/MyPetCard";
import AddPetCard from "@/components/AddPetCard";
import { getMyPets } from "@/lib/petService/getMyPets";

export default async function MyPet() {
    
    const myPets = await getMyPets();

    return (
        <div className="w-full flex justify-center">
            <div className="w-[1200px] grid grid-cols-4 justify-items-center gap-y-10 pb-10">
                {
                    myPets.map((pet) => (
                        <MyPetCard name={pet.petName} petId={pet.petId} imageURL={pet.image} />
                    ))
                }

                <AddPetCard href="/mypets/register"/>

            </div>
        </div>
    );
}