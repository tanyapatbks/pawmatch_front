"use client";

import TopMenuItem from "./TopMenuItem"; // Notice the capital letter in the import
import AppName from "./AppName";
import { RiAccountCircleLine } from "react-icons/ri";
import { MdPets } from "react-icons/md";
import { LuInbox } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";

export default function TopMenu() {
  return (
    <div className="w-full bg-white flex flex-col justify-between ">
      <AppName />
      <div className="flex justify-between px-[72px] py-[24px] h-auto border-b-[2.5px]">
        <TopMenuItem text="Profile" href="/profile">
          <RiAccountCircleLine size={24} color="rgb(136 19 55)" />
        </TopMenuItem>
        <TopMenuItem text="My Pets" href="/mypets">
          <MdPets size={24} color="rgb(136 19 55)" />
        </TopMenuItem>
        {/* <TopMenuItem text="Inbox" href="/inbox">
          <LuInbox size={24} color="rgb(136 19 55)" />
        </TopMenuItem> */}
        <TopMenuItem text="Matching" href="/matching">
          <FaRegHeart size={24} color="rgb(136 19 55)" />
        </TopMenuItem>
      </div>
    </div>
  );
}
