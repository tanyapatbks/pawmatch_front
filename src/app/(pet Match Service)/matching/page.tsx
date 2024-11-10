import { useParams } from "next/navigation";
import PageBar from "@/components/PageBar";
import TopMenu from "@/components/TopMenu";
import getMacthDetail from "@/libs/matchService/getMacthDetail";
import MatchCard from "@/components/MatchCard";
import { PetMatchDetail } from "@/types";
export default async function Page() {
  const data: PetMatchDetail [] = await getMacthDetail();
  console.log("data", data);
  return (
    <div className="h-screen bg-white flex flex-col items-center space-y-[32px]">
      <TopMenu />
      <PageBar name="Matching" />
      <div className="w-[80%] flex flex-col space-y-[24px]">
      {
        data.map((item, index) => {
          return (
            <MatchCard item={item} index={index} />
          )
            
      },
      )}
      </div>
    </div>
  );
}
