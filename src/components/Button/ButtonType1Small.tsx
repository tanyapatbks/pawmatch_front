'use client'

import Link from "next/link";

export default function ButtonType1Small({
    name,
    pathURL,
    onClick
}: {
    name: string;
    pathURL?: string;
    onClick?: Function;
}) {
    if (onClick) {
        return (
            <button className="flex justify-center items-center w-[64px] h-8 rounded-md text-sm bg-white border-[2.5px] border-rose-600 hover:bg-rose-200"
                onClick={(e) => onClick()}>
                {name}
            </button>
        )
    }

    if (pathURL) {
        return (
            <Link href={pathURL}>
                <div className="flex justify-center items-center w-[64px] h-8 rounded-md text-sm bg-white border-[2.5px] border-rose-600 hover:bg-rose-200">

                    <div className="">{name}</div>

                </div>
            </Link>
        );
    }
}
