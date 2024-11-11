"use client";

import PetCardHome from "./PetCard/PetCardHome";
import { PetFullDetail, PetFullDetailM1 } from "@/types/index";
import { PetFullDetailM2 } from "@/types/index";
import { useEffect } from "react";
import { useState } from "react";
import getRandomPets from "@/libs/petService/getRandomPets";

import ButtonType2InputFunction from "./Button/ButtonType2InputFunction";
import { IoDiceOutline } from "react-icons/io5";

interface PetCardHomeProps {
  success: boolean;
  data: PetFullDetailM1[];
}

export default function Show3PetHome({ 
  initialPets 
}: { 
  initialPets: PetFullDetailM1[];
}) {
  const [randomPetsData, setRandomPetsData] = useState<PetFullDetailM1[]>(initialPets);

  const handleNewRandom = () => {
    const fetchData = async () => {
      const randomPets = await getRandomPets();
      setRandomPetsData(randomPets);
    };
    fetchData();
  };

  return (
    <div className="flex flex-col space-y-[64px]">
      <div className="space-x-[64px] flex flex-row items-start">
        {randomPetsData.map((pet: PetFullDetailM1) => (
          <PetCardHome
            key={pet.petId}
            imageURL={pet.image}
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
