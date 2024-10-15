import TopMenuNoNavBar from "@/components/TopMenuNoNavBar";

export default function RootLayoutUserService({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <TopMenuNoNavBar />
      {children}
    </div>
  );
}
