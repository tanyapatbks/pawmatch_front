
import MyPetCard from "@/components/PetCard/MyPetCard";

const mockData = [
    {
        petId: "1",
        petName: "Snoopy",
        image: "/img/sn-color.jpg",
    },
    {
        petId: "2",
        petName: "Tom",
        image: "/img/tom.jpg",
    },
    {
        petId: "3",
        petName: "Doraemon",
        image: "/img/doraemon.jpg",
    },
    {
        petId: "4",
        petName: "Chiro",
        image: "/img/chiro.jpg",
    },
    {
        petId: "5",
        petName: "Courage",
        image: "/img/courage.jpg",
    },
    {
        petId: "6",
        petName: "Garfield",
        image: "/img/garfield.jpg",
    }
]

export default function MyPet() {
    
    const myPets = mockData;

    return (
        <div className="w-full flex justify-center">
            <div className="w-[1200px] grid grid-cols-4 justify-items-center gap-y-10 pb-10">
                {
                    myPets.map((pet) => (
                        <MyPetCard name={pet.petName} imageURL={pet.image} />
                    ))
                }
            </div>
        </div>
    );
}