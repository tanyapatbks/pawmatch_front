import TopMenu from "@/components/TopMenu";

export default function layoutMain({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-[24px] bg-white">
  
      <TopMenu />
      {children}
     
    </div>
  );
}
