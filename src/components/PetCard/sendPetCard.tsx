'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
import sendMatch from "@/libs/matchService/sendMatch";
import { useSession } from "next-auth/react";
export default function SendPetCard({
    imageURL,
    name,
    petId,
    userId,
    sendPetProfile
}: {
    imageURL?: string;
    name: string;
    petId: string;
    userId: string;
    sendPetProfile?: {
        petId: string;
        petName: string;
        userId: string;
    };
}) {
    const router = useRouter();
    console.log("sendPetProfile", userId);
    const handleSendMatch = async () => {
        if (!sendPetProfile) return;
        
        if (confirm("Do you want to send a match request?")) {
            await sendMatch(
                {
                    senderPetId: petId,
                    senderUserId: userId,
                    senderPetName: name,
                    receiverPetId: sendPetProfile.petId,
                    receiverUserId: sendPetProfile.userId,
                    receiverPetName: sendPetProfile.petName,
                }
            );
            router.push(`/`);
        }
    }
    return (

        <div className="w-[250px] h-[300px] rounded-xl bg-white overflow-hidden text-rose-950 shadow-md">
            {!imageURL ? (
                <div className="w-full h-[65%] relative rounded-t-lg bg-rose-600"> </div>
            ) : (
                <div className='w-full h-[65%] relative rounded-t-lg'>
                    <Image
                        src={imageURL}
                        alt={name}
                        fill={true}
                        className='object-cover rounded-t-lg'
                    />
                </div>
            )}

            <div className="py-2 flex flex-col space-y-3">

                <h3 className="text-center font-bold text-3xl">
                    {name}
                </h3>

                <div className="flex space-x-3 text-center font-bold justify-center">
                    <button className="flex justify-center items-center w-[128px] h-8 rounded-md text-sm bg-white border-[2.5px] border-rose-600 hover:bg-rose-200"
                        onClick={(e) => handleSendMatch()}>
                        Select a Pet
                    </button>
                </div>

            </div>

        </div>

    );
}