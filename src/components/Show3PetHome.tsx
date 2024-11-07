"use client";

import PetCardHome from "./PetCard/PetCardHome";
import PetFullDetail from "@/types/index";
import { useEffect, useRef } from "react";
import { useState } from "react";
import getRandomPets from "@/libs/petService/getRandomPets";

interface PetCardHomeProps {
  success: boolean;
  data: PetFullDetail[];
}

export default function Show3PetHome({ token }: { token: string }) {
  /*
    imageURL: string;
  name: string;
  description: string;
  petDetailPath: string; */
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

  const [randomPetsData, setRandomPetsData] = useState<PetFullDetail[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const randomPets = await getRandomPets(token);
      setRandomPetsData(randomPets.data);
    };
    fetchData();
  }, [randomPetsData]);

  const handleNewRandom = () => {
    const fetchData = async () => {
      const randomPets = await getRandomPets(token);
      setRandomPetsData(randomPets.data);
    };
    fetchData();
  };

  // const randomPets = await getRandomPets();
  // const randomPetsData = await randomPets.data;
  return (
    <div className="space-x-[64px] flex flex-row items-start">
      {mockData.map((pet) => (
        <PetCardHome
          key={pet.pid}
          imageURL={pet.imageURL}
          name={pet.name}
          gender={pet.gender}
          age={pet.age}
          description={pet.description}
          petDetailPath={"pets/" + pet.pid}
        />
      ))}
    </div>
  );
}
