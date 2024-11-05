import Link from "next/link";

export default function topMenuItems({
  text,
  href,
  children,
}: {
  text: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <div className=" w-[20%] py-[8px] h-auto flex items-center justify-center rounded-[16px] bg-white  border-[2.5px] border-rose-600 hover:bg-rose-200 hover:border-rose-700 active:bg-rose-300 active:border-rose-800">
      <Link href={href}>
        <div className="flex flex-row space-x-[32px] ">
          <div className="flex items-center ">{children}</div>

          <div className="text-[28px] font-sans font-semibold text-rose-900">
            {text}
          </div>
        </div>
      </Link>
    </div>
  );
}
