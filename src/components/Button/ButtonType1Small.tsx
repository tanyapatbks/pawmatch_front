import Link from "next/link";

export default function ButtonType1Small({
  name,
  pathURL,
}: {
  name: string;
  pathURL: string;
}) {
  return (
    <Link href={pathURL}>
      <div className="flex flox-row space-x-[8px] px-[24px] py-[8px] justify-center items-center rounded-[32px] text-[16px] bg-white border-[2.5px] border-rose-600 hover:bg-rose-200 hover:border-rose-700 active:bg-rose-300 active:border-rose-800">
        <div className="">{name}</div>
      </div>
    </Link>
  );
}
