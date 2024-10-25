'use client'

import Link from "next/link";

export default function ButtonType2Med({
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
			<button className="block rounded-md bg-rose-600 hover:bg-rose-400 px-3 py-2 text-white shadow-sm"
				onClick={(e) => onClick()}>
				{name}
			</button>
		)
	}

	if (pathURL) {
		return (
			<Link href={pathURL}>
				<div className="block rounded-md bg-rose-600 hover:bg-rose-400 px-3 py-2 text-white shadow-sm">

					<div className="">{name}</div>

				</div>
			</Link>
		);
	}
}
