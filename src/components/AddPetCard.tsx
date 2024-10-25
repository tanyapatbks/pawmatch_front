
import Link from "next/link";
import { IoIosAddCircleOutline } from "react-icons/io";

export default function AddPetCard({
    href
}: {
    href: string;
}) {
    return (
        <Link href={href}>
            <div className="w-[250px] h-[300px] rounded-xl bg-white overflow-hidden text-rose-950 shadow-md
                            flex flex-col items-center justify-center gap-y-4"
            >

                    <IoIosAddCircleOutline size="70px" />

                    <div className="font-bold text-2xl">Add Pet</div>

            </div>
        </Link>
    )
}