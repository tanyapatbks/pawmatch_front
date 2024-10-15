import Link from "next/link";

export default function AppName() {
  return (
    <div className="flex items-center justify-center font-bold text-[48px] text-white h-[80px] bg-rose-400">
      <Link href="/">PawMatch</Link>
    </div>
  );
}
