'use client'

import Link from "next/link";

export default function ButtonType1Med({
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
			<button className="block rounded-md bg-white border-rose-600 border-[2px] hover:bg-rose-200 px-3 py-2 shadow-sm"
				onClick={(e) => onClick()}>
				{name}
			</button>
		)
	}

	if (pathURL) {
		return (
			<Link href={pathURL}>
				<div className="block rounded-md bg-white border-rose-600 border-[2px] hover:bg-rose-200 px-3 py-2 shadow-sm">

					<div className="">{name}</div>

				</div>
			</Link>
		);
	}
}
