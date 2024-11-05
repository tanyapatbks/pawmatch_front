"use client";
import { useParams } from "next/navigation";
import PageBar from "@/components/PageBar";
import TopMenu from "@/components/TopMenu";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription } from "@/components/ui/card";

export default function Page() {
  const params = useParams();
  const mockDatav0 = ["dog", "cat", "fish", "bird", "bear"];
  return (
    <div className="h-screen bg-white flex flex-col items-center space-y-[32px]">
      <TopMenu />
      <PageBar name="Matching" />
      <div className="w-[80%] flex flex-col space-y-[24px]">
        {mockDatav0.map((item, index) => {
          return (
            <Card key={index} className="">
              <CardContent
                key={index}
                className="flex flex-row apace-x-[16px] items-center py-[16px] rounded-[24px] border-[3px] border-rose-600 px-[32px]"
              >
                <CardDescription
                  key={index}
                  className="text-[32px] text-rose-950 w-[20%] inline-block "
                >
                  From: {item}
                </CardDescription>
                <div className="flex flex-row justify-end w-full">
                  {/* flex flox-row space-x-[8px] px-[24px] py-[8px] justify-center items-center rounded-[32px] text-[24px] bg-white border-[2.5px] border-rose-600 hover:bg-rose-200 hover:border-rose-700 active:bg-rose-300 active:border-rose-800 */}
                  <Button
                    key={index}
                    className="bg-white text-[16px] border-[2.5px] border-rose-600 hover:bg-rose-200 hover:border-rose-700 active:bg-rose-300 active:border-rose-800 text-rose-950 px-[24px] py-[8px]"
                    onClick={() => alert(params)}
                  >
                    Detail
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
