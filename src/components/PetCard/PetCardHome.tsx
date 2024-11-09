import Image from "next/image";
import ButtonType1 from "../Button/ButtonType1";

export default function PetCardHome({
  imageURL,
  name,
  gender,
  age,
  description,
  petDetailPath,
}: {
  imageURL: string;
  name: string;
  gender: string;
  age: number;
  description: string;
  petDetailPath: string;
}) {
  const noImage = imageURL === "" ? true : false;
  return (
    <div className="w-[320px] h-auto rounded-[24px] space-y-[16px] bg-white overflow-hidden text-rose-950 shadow-md">
      {noImage ? (
        <div className="w-full h-[208px] bg-rose-200"> </div>
      ) : (
        <div className="object-contain h-[208px] w-full overflow-hidden items-center">
          <Image
            src={imageURL}
            alt={name + "'s image"}
            className="object-none object-center"
            width={320}
            height={208}
          />
        </div>
      )}

      <div className="px-[16px] pt-[8px] pb-[16px] flex flex-col space-y-[32px]">
        <div className="flex flex-col space-y-[8px]">
          <h2 className="font-bold text-[32px] "> {name}</h2>
          <div className=" px-[8px] flex flex-row justify-between bg-rose-200 rounded-[24px]">
            <h2 className=" text-[20px] font-bold">
              Gender: {gender ? gender : "Unknown"}
            </h2>
            <h2 className=" text-[20px]  font-bold">Age: {age ? age : 0}</h2>
          </div>
          <div className="h-[160px] overflow-y-scroll">
            <h2 className="font-normal ">{description}</h2>
          </div>
        </div>
        <div className="flex justify-end">
          <ButtonType1
            name="Detail"
            isShowLeft={false}
            isShowRight={false}
            pathURL={petDetailPath}
          />
        </div>
      </div>
    </div>
  );
}
