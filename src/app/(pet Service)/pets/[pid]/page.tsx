import PageBar from "@/components/PageBar";
import Image from "next/image";
import ButtonType1 from "@/components/Button/ButtonType1";
import ButtonType2 from "@/components/Button/ButtonType2";
import ButtonType2InputFunction from "@/components/Button/ButtonType2InputFunction";
import { MdRateReview, MdSend } from "react-icons/md";
import getPet from "@/libs/petService/getPet";
import { PetFullDetailM2 } from "@/types";
import sendMatch from "@/libs/matchService/sendMatch";
import Link from "next/link";

// import { MdSend } from "react-icons/md";

interface petDetailData {
  success: boolean;
  data: PetFullDetailM2;
}

export default async function PetDetailPage({
  params,
}: {
  params: { pid: string };
}) {
  console.log("=========================================");
  const mockData = new Map();
  mockData.set("001", {
    name: "Tiger II",
    description: "PzKpfw VI Tiger II Ausf.B",
    species: "cat",
    petDetailPath: "pet/001",
    imageURL: [
      "/img/Tiger2.jpg",
      "/img/Tiger2-2.jpg",
      "/img/Tiger2-3.jpg",
      "/img/Tiger2-4.jpg",
      "/img/Tiger2-5.jpg",
      "/img/Tiger2-6.jpg",
    ],
    gender: "Male",
    age: 5,
    vaccinatedComment: "complete",
  });
  mockData.set("002", {
    name: "Panzer IV Ausf.J",
    description: "PzKpfw IV Ausf.J",
    species: "cat",
    petDetailPath: "pet/002",
    imageURL: ["/img/Pz4j.jpg", "/img/Pz4j-2.jpg", "/img/Pz4j-3.jpg"],
    gender: "Female",
    age: 5,
    vaccinatedComment: "pending",
  });
  mockData.set("003", {
    name: "Panther Ausf.G",
    description:
      "PzKpfw V 'Panther' Ausf.G tanks first saw action on the Eastern fronts. They were also used in Italy, France, Belgium and Holland. They took part in the Ardennes offensive, the battle of the Bulge plus the defence of Germany. It had better cross-country mobility than the Tiger tank and had the same if not more hitting power, with its 7.5 cm Kw.K 42 L/70 long barrelled high velocity anti-tank gun. Around 6,000 were produced.",
    species: "cat",
    petDetailPath: "pet/003",
    imageURL: [
      "/img/Panther.jpg",
      "/img/Panther-2.jpg",
      "/img/Panther-3.jpg",
      "/img/Panther-4.jpg",
      "/img/Panther-5.jpg",
    ],
    gender: "Male",
    age: 5,
    vaccinatedComment: "complete",
  });

  // let mockD = mockData.get(params.pid);
  let mockD = mockData.get("003");
  const petId = await params.pid;
  // const petDetail: petDetailData = await getPet(petId);

  const petDetail: petDetailData = await getPet(petId);
  console.log("petDetail:", petDetail);
  const petDetailD = await petDetail.data;

  if (!petDetailD) {
    return (
      <div className="flex flex-col justify-center items-center text-[80px] font-bold w-screen h-screen text-rose-200 ">
        {/* {`Loading Data of Pet ID: ${params.pid}`} */}
        Loading...
      </div>
    );
  }
  console.log("params.pid", params.pid);
  console.log(petDetailD);
  //Data Clening
  let petImage: string[] = await petDetailD.image;
  console.log(petImage);
  if (petImage.length === 0) {
    for (let i = 0; i < 3; i++) {
      petImage.push("/img/default-pet-image.png");
    }
  } else if (petImage.length % 3 !== 0) {
    let placeholderImage = 3 - (petImage.length % 3);
    for (let i = 0; i < placeholderImage; i++) {
      petImage.push("/img/default-pet-image.png");
    }
  }
  // for (let i = 0; i < petImage.length; i++) {
  //   console.log("picture ", i, ":", petImage[i]);
  // }
  let allimg = petImage.join("--------------------");
  // console.log();
  // Function to determine the background color based on vaccination status
  const getVaccinationBgColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-amber-400 ";
      case "never":
        return "bg-red-400";
      case "complete":
        return "bg-lime-400";
      default:
        return "bg-gray-200"; // Fallback color if status is unknown
    }
  };

  const getVaccinationStatus = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "Pending";
      case "never":
        return "Never";
      case "complete":
        return "Complete";
      default:
        return "Unknown"; // Fallback color if status is unknown
    }
  };
  /*const sendRequest =async () => {
    const data={
      senderUserId: "1",
      senderPetId:
    }
    const response = await sendMatch();
    if (response.success) {
      alert("Match request sent successfully");
    } else {
      alert("Match request failed");
    }
  };
  }*/
  return (
    <div className="flex flex-col space-y-[64px] text-rose-950">
      {/* <div>{params.pid}</div> */}
      {/* <div>allimg: {allimg}</div> */}
      <PageBar name="Pet Detail" />
      <div className="px-[64px] flex flex-row space-x-[64px]">
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
        <div className="w-full flex flex-col justify-center">
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
      </div>

      <div className="px-[64px] flex flex-col space-y-[40px]">
        <h1 className="text-[48px] font-bold">Description</h1>
        <h1 className="text-[24px] font-normal">
          {petDetailD.behaviorDescription}
        </h1>
      </div>

      <div className="px-[64px] flex flex-row justify-between items-center">
        <h1 className="text-[48px] font-bold w-[auto]">Vaccination Status</h1>
        <div
          className={`text-[32px] font-semibold px-8 py-4 rounded-[24px] ${getVaccinationBgColor(
            petDetailD.vaccinatedComment
          )}`}
        >
          {getVaccinationStatus(petDetailD.vaccinatedComment)}
        </div>
      </div>

      <div className="px-[64px] py-[32px] grid grid-cols-3 gap-y-[56px] gap-x-[56px]">
        {petDetailD.image.map((images: string) => (
          <div
            // key={images}
            className="w-[480px] h-[270px] object-contain rounded-[24px] overflow-hidden ring-[4px] ring-rose-200"
          >
            <Image
              src={images}
              alt={petDetailD.petName + "'s picture"}
              width={480}
              height={270}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center">
        <ButtonType1
          name="Read Reviews"
          isShowLeft={true}
          isShowRight={false}
          pathURL={params.pid + "/reviews"}
          iconLeft={<MdRateReview />}
        />
      </div>
      <div className="flex justify-center items-center">
        <Link href={`/pets/${params.pid}/request`}>
          <ButtonType2InputFunction
            name="Send Request"
            isShowLeft={false}
            isShowRight={true}
            iconRight={<MdSend />}
          />
        </Link>
      </div>
    </div>
  );
}
