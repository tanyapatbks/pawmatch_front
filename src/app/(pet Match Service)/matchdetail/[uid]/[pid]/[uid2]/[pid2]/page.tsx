import TopMenu from "@/components/TopMenu";
import PageBar from "@/components/PageBar";
import getPet from "@/libs/petService/getPet";
import Image from "next/image";
import Link from "next/link";
import getUser from "@/libs/matchService/getUser";
import OwnerDetail from "@/components/OwnerDetail";

export default async function matchDetail(params: { params: { pid: string; uid: string; pid2: string } }) {
  const petDetailD = await getPet(params.params.pid).then((data) => data.data);
  const userData = await getUser(params.params.uid).then((data) => {
    const { userId, displayName, ...displayUser } = data.profile;
    return displayUser;
  });

  return (
    <div className="h-screen bg-white flex flex-col items-center space-y-8">
      <TopMenu />
      <PageBar name="Matching Detail" />
      <div className="px-8 flex flex-row space-x-16">
        <div className="object-contain rounded-3xl overflow-hidden ring-4 ring-rose-200">
          {petDetailD.image[0] === "" ? (
            <div className="w-72 h-40 bg-rose-400"></div>
          ) : (
            <Image
              src={petDetailD.image[0]}
              alt={`${petDetailD.petName}'s picture`}
              width={720}
              height={405}
            />
          )}
        </div>

        <div className="flex flex-col space-y-10 py-4">
          <h2 className="text-4xl font-bold">{petDetailD.petName}</h2>
          <h3 className="text-4xl font-semibold">Age: {petDetailD.age}</h3>
          <h3 className="text-4xl font-semibold">Gender: {petDetailD.gender}</h3>
          <h3 className="text-4xl font-semibold">Species: {petDetailD.species}</h3>
        </div>
      </div>
      <div>
        <Link href={`/pets/${params.params.pid}`}>
          <button className="bg-rose-400 text-white px-4 py-2 rounded">Read Pet Full Details</button>
        </Link>
      </div>
      <div>
        <OwnerDetail user={userData} />
      </div>
    </div>
  );
}