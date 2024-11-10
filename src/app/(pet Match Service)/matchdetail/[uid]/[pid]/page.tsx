import TopMenu from "@/components/TopMenu";
import PageBar from "@/components/PageBar";
import getPet from "@/libs/petService/getPet";
import Image from "next/image";
import Link from "next/link";
export default async function matchDetail(params: { params:{pid:string, uid:string} }) {
    
    const petDetailD =await getPet(params.params.pid).then((data) => {
        return data.data;
    });
    return (
        <div className="h-screen bg-white flex flex-col items-center space-y-[32px]">
            <TopMenu />
            <PageBar name="Matching Detail" />
            <div className="px-[32px] flex flex-row space-x-[64px]">
                <div className="object-contain rounded-[24px] overflow-hidden ring-[4px] ring-rose-200 ">
                    {petDetailD.image[0] === "" ? (
                        <div className="w-[720px] h-[405px] bg-rose-400"></div>
                    ) : (
                        <Image
                            src={petDetailD.image[0]}
                            alt={petDetailD.petName + "'s picture"}
                            width={480 * 1.5}
                            height={270 * 1.5}
                        />
                    )}
                </div>

                <div className="flex flex-col space-y-[40px] py-[16px]">
                    <h2 className="text-[40px] font-bold">{petDetailD.petName}</h2>
                    <h2 className="text-[40px] font-semibold">Age: {petDetailD.age}</h2>
                    <h2 className="text-[40px] font-semibold">
                        Gender: {petDetailD.gender}
                    </h2>
                    <h2 className="text-[40px] font-semibold">
                        Species: {petDetailD.species}
                    </h2>
                </div>
            </div>
            <div>
                <Link href={`/pets/${params.params.pid}`}>
                    <button className="bg-rose-400 text-white px-[16px] py-[8px] rounded-[8px]">Read Pet Full Details</button>
                </Link>
            </div>
            <div>
            Owner's Detail
            </div>

        </div>
    )
}

/*            <div className="px-[64px] flex flex-row space-x-[64px]">
                <div className="object-contain rounded-[24px] overflow-hidden ring-[4px] ring-rose-200 ">
                    {petDetailD.image[0] === "" ? (
                        <div className="w-[720px] h-[405px] bg-rose-400"></div>
                    ) : (
                        <Image
                            src={petDetailD.image[0]}
                            alt={petDetailD.petName + "'s picture"}
                            width={480 * 1.5}
                            height={270 * 1.5}
                        />
                    )}
                </div>

                <div className="flex flex-col space-y-[40px] py-[16px]">
                    <h2 className="text-[40px] font-bold">{petDetailD.petName}</h2>
                    <h2 className="text-[40px] font-semibold">Age: {petDetailD.age}</h2>
                    <h2 className="text-[40px] font-semibold">
                        Gender: {petDetailD.gender}
                    </h2>
                    <h2 className="text-[40px] font-semibold">
                        Species: {petDetailD.species}
                    </h2>
                </div>
            </div>*/