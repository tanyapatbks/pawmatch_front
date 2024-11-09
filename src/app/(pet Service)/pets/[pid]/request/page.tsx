
import SendPetCard from "@/components/PetCard/sendPetCard";
import { getMyPets } from "@/libs/petService/getMyPets";
import getPet from "@/libs/petService/getPet";
import { use } from "react";
export default async function MyPet({
    params,
  }: {
    params: { pid: string };
  }) {
    
    interface PetProfile {
        petId: string;
        petName: string;
        userId: string;
    }
    const myPets = await getMyPets();
    const sendPets = await getPet(params.pid).then((data) => data.data);
    console.log("sendPets", sendPets);
   const sendData:PetProfile={
    petId:sendPets._id,
    petName:sendPets.petName,
    userId:sendPets.userId,}
    return (
        <div className="w-full flex justify-center">
            <div className="w-[1200px] grid grid-cols-4 justify-items-center gap-y-10 pb-10">
                {
                    myPets.map((pet) => (
                        <SendPetCard name={pet.petName} petId={pet.petId} imageURL={pet.image} userId={pet.userId} sendPetProfile={sendData}/>
                    ))
                }
            </div>
        </div>
    );
}