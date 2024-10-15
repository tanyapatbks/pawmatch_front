import Link from "next/link";

export default function ButtonType2({
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
      <div className="flex flox-row space-x-[8px] px-[24px] py-[8px] justify-center items-center rounded-[32px] bg-rose-600 hover:bg-rose-200 text-[24px] text-white hover:text-rose-950">
        {isShowLeft ? <div className="h-[24px]">{iconLeft}</div> : ""}
        <div className="">{name}</div>
        {isShowRight ? <div className="h-[24px]">{iconRight}</div> : ""}
      </div>
    </Link>
  );
}
