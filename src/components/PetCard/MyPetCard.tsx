
import Image from "next/image";
import ButtonType1 from "../Button/ButtonType1";
import ButtonType1Small from "../Button/ButtonType1Small";

export default function MyPetCard({
    imageURL,
    name
}: {
    imageURL?: string;
    name: string;
}) {
    return (

        <div className="w-[250px] h-[300px] rounded-xl bg-white overflow-hidden text-rose-950 shadow-md">

            {!imageURL ? (
                <div className="w-full h-[65%] relative rounded-t-lg bg-rose-600"> </div>
            ) : (
                <div className='w-full h-[65%] relative rounded-t-lg'>
                    <Image
                        src={imageURL}
                        alt={name}
                        fill={true}
                        className='object-cover rounded-t-lg'
                    />
                </div>
            )}

            <div className="py-2 flex flex-col space-y-3">

                <h3 className="text-center font-bold text-3xl">
                    {name}
                </h3>

                <div className="flex space-x-3 text-center font-bold justify-center">
                    <ButtonType1Small
                        name="Edit"
                        pathURL={"/mypets"}
                    />
                    <ButtonType1Small
                        name="Delete"
                        pathURL={"/mypets"}
                    />
                </div>

            </div>

        </div>

    );
}