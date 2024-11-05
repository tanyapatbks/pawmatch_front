'use client'
import { useParams } from 'next/navigation'
import PageBar from '@/components/PageBar'
import TopMenu from '@/components/TopMenu'
import { Button } from "@/components/ui/button"
import { Card,CardContent, CardDescription } from '@/components/ui/card'


export default function Page(){
    const params = useParams()
    const mockDatav0=['dog','cat','fish','bird','bear']
    return <div className="h-screen bg-white flex flex-col items-center pb-10 space-b-[64px]">
            <TopMenu />
            <PageBar name="Matching" />
            <div className='w-[80%] '>
            {mockDatav0.map((item,index) => {
                return <Card key={index} className='mb-3'>  
                <CardContent key={index} className='flex flex-row items-center relative py-5 rounded-xl border-[3px] border-rose-950 px-10'>
                    <CardDescription key={index} className='text-2xl text-rose-950'>From: {item}</CardDescription>
                    <Button key={index} className="hover:bg-rose-500 absolute right-10 bg-rose-950" onClick={() => alert(params)}>Detail</Button>
                </CardContent>
            </Card>})
            }
                </div>
            </div>
}