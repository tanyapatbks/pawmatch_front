import TopMenuItem from "./TopMenuItem"; // Notice the capital letter in the import
import { RiAccountCircleLine } from "react-icons/ri";
import { MdPets } from "react-icons/md";
import { LuInbox } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";

export default function TopMenu() {
  return (
    <div className="w-full bg-white flex flex-col justify-between ">
      <div className="flex items-center justify-center text-lg font-bold text-[48px] text-white h-[80px] bg-rose-400">
        PawMatch
      </div>
      <div className="flex justify-between  px-[16px] py-[24px] h-[88px] border-b-[2.5px]">
        <TopMenuItem text="Profile" href="/profile">
          <RiAccountCircleLine size={24} color="rgb(136 19 55)" />
        </TopMenuItem>
        <TopMenuItem text="My Pets" href="/mypets">
          <MdPets size={24} color="rgb(136 19 55)" />
        </TopMenuItem>
        <TopMenuItem text="Inbox" href="/inbox">
          <LuInbox size={24} color="rgb(136 19 55)" />
        </TopMenuItem>
        <TopMenuItem text="Matching" href="/matching">
          <FaRegHeart size={24} color="rgb(136 19 55)" />
        </TopMenuItem>
      </div>
    </div>
  );
}
