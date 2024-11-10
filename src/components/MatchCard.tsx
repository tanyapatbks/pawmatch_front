'use client'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { PetMatchDetail } from "@/types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
export default function MatchCard({item,index}:{item:PetMatchDetail,index:number})  {
    const router = useRouter();
    return <Card key={index} className="">
        <CardContent
            key={index}
            className="flex flex-row apace-x-[16px] items-center py-[16px] rounded-[24px] border-[3px] border-rose-600 px-[32px]"
        >
            <CardDescription
                key={index}
                className="text-[32px] text-rose-950 w-[40%] inline-block "
            >
                From: {item.matchPetName1} To: {item.matchPetName2}
            </CardDescription>
            <div className="flex flex-row justify-end w-full">
                {/* flex flox-row space-x-[8px] px-[24px] py-[8px] justify-center items-center rounded-[32px] text-[24px] bg-white border-[2.5px] border-rose-600 hover:bg-rose-200 hover:border-rose-700 active:bg-rose-300 active:border-rose-800 */}
                <Button
                    key={index}
                    className="bg-white text-[16px] border-[2.5px] border-rose-600 hover:bg-rose-200 hover:border-rose-700 active:bg-rose-300 active:border-rose-800 text-rose-950 px-[24px] py-[8px]"
                    onClick={() => {router.push(`/matchdetail/${item.matchUserId1}/${item.matchPetId1}/${item.matchUserId2}/${item.matchPetId2}`)}}
                >
                    Detail
                </Button>
            </div>
        </CardContent>
    </Card>
}