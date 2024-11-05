import React from "react";

interface ButtonType1Props {
  name: string;
  isShowRight: boolean;
  isShowLeft: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  onClick?: () => void;
}

export default function ButtonType1InputFunction({
  name,
  isShowRight,
  isShowLeft,
  iconLeft,
  iconRight,
  onClick, // Destructure the onClick prop
}: ButtonType1Props) {
  return (
    <div
      onClick={onClick} // Attach onClick handler to the div
      className="flex flox-row space-x-[8px] px-[24px] py-[8px] justify-center items-center rounded-[32px] text-[24px] bg-white border-[2.5px] border-rose-600 hover:bg-rose-200 hover:border-rose-700 active:bg-rose-300 active:border-rose-800 cursor-pointer"
    >
      {isShowLeft ? <div className="h-[24px]">{iconLeft}</div> : null}
      <div className="">{name}</div>
      {isShowRight ? <div className="h-[24px]">{iconRight}</div> : null}
    </div>
  );
}
