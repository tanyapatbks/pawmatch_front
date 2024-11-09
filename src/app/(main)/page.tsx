import PageBar from "@/components/PageBar";
import Show3PetHome from "@/components/Show3PetHome";
import ButtonType2 from "@/components/Button/ButtonType2";
import ButtonType2InputFunction from "@/components/Button/ButtonType2InputFunction";
import { IoDiceOutline } from "react-icons/io5";
import { getSession } from "next-auth/react";
export default async function Home() {
  const session = await getSession();
  const token = session?.accessToken;
  console.log("session", token);
  return (
    <div className="flex flex-col space-y-[64px]">
      <PageBar name="Home" />
      <div className="flex justify-center">
        <Show3PetHome token={token} />
      </div>
    </div>
  );
}
