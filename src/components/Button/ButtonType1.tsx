import Link from "next/link";

export default function ButtonType1({
  name,
  isShowRight,
  isShowLeft,
  iconLeft,
  iconRight,
  pathURL,
}: {
  name: string;
  isShowRight: boolean;
  isShowLeft: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  pathURL: string;
}) {
  return (
    <Link href={pathURL}>
      <div className="flex flox-row space-x-[8px] px-[24px] py-[8px] justify-center items-center rounded-[32px] text-[24px] bg-white border-[2.5px] border-rose-600 hover:bg-rose-200 hover:border-rose-700 active:bg-rose-300 active:border-rose-800">
        {isShowLeft ? <div className="h-[24px]">{iconLeft}</div> : ""}
        <div className="text-rose-950">{name}</div>
        {isShowRight ? <div className="h-[24px]">{iconRight}</div> : ""}
      </div>
    </Link>
  );
}
