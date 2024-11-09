import PageBar from "@/components/PageBar";
import Show3PetHome from "@/components/Show3PetHome";
import ButtonType2 from "@/components/Button/ButtonType2";
import ButtonType2InputFunction from "@/components/Button/ButtonType2InputFunction";
import { IoDiceOutline } from "react-icons/io5";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log("session at home page", session);
  // console.log("Access Token:", session?.accessToken);
  const token = session?.accessToken;
  console.log("token at home ", token);
  return (
    <div className="flex flex-col space-y-[64px]">
      <PageBar name="Home" />
      {token ? (
        <div className="flex justify-center">
          <Show3PetHome token={token} />
        </div>
      ) : (
        <div className="flex justify-center">
          <Show3PetHome />
        </div>
      )}
    </div>
  );
}
