
import PetProfileForm from "@/components/Form/PetProfileForm";
import { PetFullDetail } from "@/types";
import getPet from "@/libs/petService/getPet";

export default async function PetEdit({ params }: { params: { pid: string } }) {

  const initialPetData: PetFullDetail = await getPetData(params.pid);

  initialPetData.image = convertImage(initialPetData.image);

  function convertImage(image: string[]) {
    return image.map((url: string) => { return { dataURL: url } });
  };

  async function getPetData(petId: string) {
    const response = await getPet(petId);
    return response.data;
  }

  return (
    <div className="w-full flex justify-center">

      <PetProfileForm formName={`Editing Pet: ${params.pid}`} initialPetData={initialPetData} />

    </div>
  );
}