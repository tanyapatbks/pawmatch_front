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
    <div className=" w-[20%] flex items-center justify-center bg-white rounded-[16px] border-[2.5px] border-rose-600 hover:bg-rose-200 hover:border-[0px]">
      <Link href={href}>
        <div className="flex flex-row space-x-[32px]">
          <div className="flex items-center ">{children}</div>

          <div className="text-[28px] font-sans font-semibold text-rose-900">
            {text}
          </div>
        </div>
      </Link>
    </div>
  );
}
