
import MyPetCard from "@/components/PetCard/MyPetCard";
import AddPetCard from "@/components/AddPetCard";
import { getMyPets } from "@/lib/petService/getMyPets";

const mockData = [
    {
        petId: "12345",
        petName: "Snoopy",
        image: "/img/sn-color.jpg",
    },
    {
        petId: "22345",
        petName: "Tom",
        image: "/img/tom.jpg",
    },
    {
        petId: "32345",
        petName: "Doraemon",
        image: "/img/doraemon.jpg",
    },
    {
        petId: "42345",
        petName: "Chiro",
        image: "/img/chiro.jpg",
    },
    {
        petId: "52345",
        petName: "Courage",
        image: "/img/courage.jpg",
    },
    {
        petId: "62345",
        petName: "Garfield",
        image: "/img/garfield.jpg",
    }
]

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