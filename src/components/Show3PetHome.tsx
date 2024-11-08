"use client";

import PetCardHome from "./PetCard/PetCardHome";
import PetFullDetail from "@/types/index";
import PetFullDetailM2 from "@/types/index";
import { useEffect } from "react";
import { useState } from "react";
import getRandomPets from "@/libs/petService/getRandomPets";

import ButtonType2InputFunction from "./Button/ButtonType2InputFunction";
import { IoDiceOutline } from "react-icons/io5";

interface PetCardHomeProps {
  success: boolean;
  data: PetFullDetail[];
}

export default function Show3PetHome() {
  /*
    imageURL: string;
  name: string;
  description: string;
  petDetailPath: string; */
  // const { data: session, status } = useSession();
  // if (status === "loading") {
  //   return <div>Loading...</div>;
  // }

  // if (!session) {
  //   return <div>No session</div>;
  // }

  // if (!session.accessToken) {
  //   return <div>No session accessToken</div>;
  // }

  // // Since session.accessToken exists, we can assign it directly
  // const token = session.accessToken;

  let mockData = [
    {
      pid: "001",
      name: "Tiger II",
      description: "PzKpfw VI Tiger II Ausf.B",
      petDetailPath: "pets/001",
      imageURL: "/img/Tiger2.jpg",
      gender: "Male",
      age: 5,
    },
    {
      pid: "002",
      name: "Panzer IV Ausf.J",
      description: "PzKpfw IV Ausf.J",
      petDetailPath: "pets/002",
      imageURL: "/img/Pz4j.jpg",
      gender: "Female",
      age: 5,
    },
    {
      pid: "003",
      name: "Panther Ausf.G",
      description:
        "PzKpfw V 'Panther' Ausf.G tanks first saw action on the Eastern fronts. They were also used in Italy, France, Belgium and Holland. They took part in the Ardennes offensive, the battle of the Bulge plus the defence of Germany. It had better cross-country mobility than the Tiger tank and had the same if not more hitting power, with its 7.5 cm Kw.K 42 L/70 long barrelled high velocity anti-tank gun. Around 6,000 were produced.",
      petDetailPath: "pets/003",
      imageURL: "/img/Panther.jpg",
      gender: "Male",
      age: 5,
    },
  ];

  const [randomPetsData, setRandomPetsData] = useState<PetFullDetailM2[]>([]);

  // console.log("==================================");
  // for (let i = 0; i < randomPetsData.length; i++) {
  //   console.log(randomPetsData[i].petId);
  //   console.log(randomPetsData[i].image[0]);
  // }

  useEffect(() => {
    const fetchData = async () => {
      const randomPets = await getRandomPets();
      setRandomPetsData(randomPets.data);
    };
    fetchData();
  }, []);

  const handleNewRandom = () => {
    const fetchData = async () => {
      const randomPets = await getRandomPets();
      // for (let i = 0; i < randomPets.data.length; i++) {
      //   console.log(`new qurry ${i}`, randomPets.data[i].petId);
      // }
      setRandomPetsData(randomPets.data);
    };
    fetchData();
  };

  // const randomPets = await getRandomPets();
  // const randomPetsData = await randomPets.data;
  if (!randomPetsData) {
    return (
      <div className="flex flex-col justify-center items-center text-[80px] font-bold">
        Loading...
      </div>
    );
  }
  return (
    <div className="flex flex-col space-y-[64px]">
      <div className="space-x-[64px] flex flex-row items-start">
        {randomPetsData.map((pet: PetFullDetailM2) => (
          <PetCardHome
            key={pet.petId}
            imageURL={
              Array.isArray(pet.image) && pet.image.length > 0
                ? pet.image[0]
                : ""
            }
            name={pet.petName}
            gender={pet.gender}
            age={pet.age}
            description={pet.behaviorDescription}
            petDetailPath={"pets/" + pet.petId}
          />
        ))}
      </div>
      <div className="flex justify-center items-center">
        <div className="flex justify-center items-center">
          <ButtonType2InputFunction
            name="Random More Pets"
            isShowLeft={true}
            isShowRight={false}
            iconLeft={<IoDiceOutline size={24} />}
            onClick={() => handleNewRandom()}
          />
        </div>
      </div>
    </div>
  );
}
