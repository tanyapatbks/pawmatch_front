export default function PageBar({ name }: { name: string }) {
  return (
    <div className="w-full px-[64px] py-[16px]">
      <div className="rounded-[24px] px-[64px] py-[16px] bg-white text-[32px] font-serif font-bold text-rose-600 border-[4px] border-rose-600">
        {name}
      </div>
    </div>
  );
}
