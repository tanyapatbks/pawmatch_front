
import SendPetCard from "@/components/PetCard/sendPetCard";
import { getMyPets } from "@/libs/petService/getMyPets";
import getPet from "@/libs/petService/getPet";
import { use } from "react";
export default async function MyPet({
    params,
  }: {
    params: { pid: string };
  }) {
    
    const myPets = await getMyPets();
    const sendPets = await getPet(params.pid).then((data) => data.data);
   const sendData={
    petId:sendPets._id,
    petName:sendPets.petName,
    userId:sendPets.userId,}
    console.log(sendData);
    return (
        <div className="w-full flex justify-center">
            <div className="w-[1200px] grid grid-cols-4 justify-items-center gap-y-10 pb-10">
                {
                    myPets.map((pet) => (
                        <SendPetCard name={pet.petName} petId={pet.petId} imageURL={pet.image} petProfile={sendData}/>
                    ))
                }
            </div>
        </div>
    );
}