'use client'

import Image from "next/image";
import ButtonType1Small from "../Button/ButtonType1Small";
import { useRouter } from "next/navigation";
import deletePet from "@/libs/petService/deletePet";

export default function MyPetCard({
    imageURL,
    name,
    petId
}: {
    imageURL?: string;
    name: string;
    petId: string;
}) {

    const router = useRouter();
    
    const handleEditPet = () => {
        router.push(`/mypets/${petId}/edit`);
    };
    
    const handleDeletePet = async () => {
        await deletePet(petId);
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
                    <ButtonType1Small
                        name="Edit"
                        onClick={handleEditPet}
                    />
                    <ButtonType1Small
                        name="Delete"
                        onClick={handleDeletePet}
                    />
                </div>

            </div>

        </div>

    );
}