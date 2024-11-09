import TopMenu from "@/components/TopMenu";
import { getSession } from "next-auth/react";

export default function layoutMain({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = getSession();

  return (
    <div className="space-y-[24px] bg-white">
      <TopMenu />
      {children}

    </div>
  );
}
