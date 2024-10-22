import Link from "next/link";

export default function ButtonType1Small({
    name,
    pathURL
}: {
    name: string;
    pathURL: string;
}) {
    return (
        <Link href={pathURL}>
            <div className="flex justify-center items-center w-[64px] h-8 rounded-md text-sm bg-white border-[2.5px] border-rose-600 hover:bg-rose-200">

                <div className="">{name}</div>

            </div>
        </Link>
    );
}
