import PageBar from "@/components/PageBar";
import Image from "next/image";
import ButtonType1 from "@/components/Button/ButtonType1";
import ButtonType2 from "@/components/Button/ButtonType2";
import ButtonType2InputFunction from "@/components/Button/ButtonType2InputFunction";
import { MdRateReview, MdSend } from "react-icons/md";
// import { MdSend } from "react-icons/md";

export default async function PetDetailPage({
  params,
}: {
  params: { pid: string };
}) {
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

  let mockD = mockData.get(params.pid);

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

  return (
    <div className="flex flex-col space-y-[64px] text-rose-950">
      <PageBar name="Pet Detail" />
      <div className="px-[64px] flex flex-row space-x-[64px]">
        <div className="object-contain rounded-[24px] overflow-hidden ring-[4px] ring-rose-200 ">
          <Image
            src={mockD.imageURL[0]}
            alt={mockD.name + "'s picture"}
            width={480 * 1.5}
            height={270 * 1.5}
          />
        </div>

        <div className="flex flex-col space-y-[40px] py-[16px]">
          <h2 className="text-[40px] font-bold">{mockD.name}</h2>
          <h2 className="text-[40px] font-semibold">Age: {mockD.age}</h2>
          <h2 className="text-[40px] font-semibold">Gender: {mockD.gender}</h2>
          <h2 className="text-[40px] font-semibold">
            Species: {mockD.species}
          </h2>
        </div>
      </div>

      <div className="px-[64px] flex flex-col space-y-[40px]">
        <h1 className="text-[48px] font-bold">Description</h1>
        <h1 className="text-[24px] font-normal">{mockD.description}</h1>
      </div>

      <div className="px-[64px] flex flex-row justify-between items-center">
        <h1 className="text-[48px] font-bold w-[auto]">Vaccination Status</h1>
        <div
          className={`text-[32px] font-semibold px-8 py-4 rounded-[24px] ${getVaccinationBgColor(
            mockD.vaccinatedComment
          )}`}
        >
          {getVaccinationStatus(mockD.vaccinatedComment)}
        </div>
      </div>

      <div className="px-[64px] py-[32px] grid grid-cols-3 gap-y-[56px] gap-x-[56px]">
        {mockD.imageURL.map((images: string) => (
          <div
            key={images}
            className="w-[480px] h-[270px] object-contain rounded-[24px] overflow-hidden ring-[4px] ring-rose-200"
          >
            <Image
              src={images}
              alt={mockD.name + "'s picture"}
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
          pathURL={"pets/" + mockD.pid + "/reviews"}
          iconLeft={<MdRateReview />}
        />
      </div>
      <div className="flex justify-center items-center">
        <ButtonType2InputFunction
          name="Send Request"
          isShowLeft={false}
          isShowRight={true}
          iconRight={<MdSend />}
          // onClick={void}
        />
      </div>
    </div>
  );
}
