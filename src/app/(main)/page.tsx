import PageBar from "@/components/PageBar";
import Show3PetHome from "@/components/Show3PetHome";
import ButtonType2 from "@/components/Button/ButtonType2";
import ButtonType2InputFunction from "@/components/Button/ButtonType2InputFunction";
import { IoDiceOutline } from "react-icons/io5";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import getRandomPets from "@/libs/petService/getRandomPets";

export default async function Home() {
  
  const initialPets = await getRandomPets();

  return (
    <div className="flex flex-col space-y-[64px] pb-5">
      <PageBar name="Home" />
      <div className="flex justify-center">
        <Show3PetHome initialPets={initialPets} />
      </div>
    </div>
  );
}
