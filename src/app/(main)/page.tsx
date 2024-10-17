import PageBar from "@/components/PageBar";
import Show3PetHome from "@/components/Show3PetHome";
import ButtonType2 from "@/components/Button/ButtonType2";
import ButtonType2InputFunction from "@/components/Button/ButtonType2InputFunction";
import { IoDiceOutline } from "react-icons/io5";

export default function Home() {
  return (
    <div className="flex flex-col space-y-[64px]">
      <PageBar name="Home" />
      <div className="flex justify-center">
        <Show3PetHome />
      </div>
      <div className="flex justify-center items-center">
        <div className="flex justify-center items-center">
          <ButtonType2InputFunction
            name="Random More Pets"
            isShowLeft={true}
            isShowRight={false}
            iconLeft={<IoDiceOutline size={24} />}
            // onClick={void}
          />
        </div>
      </div>
    </div>
  );
}
