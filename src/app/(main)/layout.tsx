import TopMenu from "@/components/TopMenu";

export default function layoutMain({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <TopMenu />
      {children}
    </div>
  );
}
