import Link from "next/link";

interface ButtonType2Props {
  name: string;
  isShowRight: boolean;
  isShowLeft: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  onClick?: () => void;
}
export default function ButtonType2InputFunction({
  name,
  isShowRight,
  isShowLeft,
  iconLeft,
  iconRight,
  onClick, // Destructure the onClick prop
}: ButtonType2Props) {
  return (
    <div
      className="flex flox-row space-x-[8px] px-[24px] py-[8px] justify-center items-center rounded-[32px] bg-rose-600 hover:bg-rose-100 text-[24px]  text-white hover:text-rose-950"
      onClick={onClick}
    >
      {isShowLeft ? <div className="h-[24px]">{iconLeft}</div> : ""}
      <div className="">{name}</div>
      {isShowRight ? <div className="h-[24px]">{iconRight}</div> : ""}
    </div>
  );
}
