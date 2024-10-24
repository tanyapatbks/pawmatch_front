// src/app/(user Service)/auth/layout.tsx
// import TopMenu from "@/components/TopMenu";
import TopMenuNoNavBar from "@/components/TopMenuNoNavBar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-[24px] bg-white">
      <TopMenuNoNavBar />
      {children}
    </div>
  );
}
