
import PetProfileForm from "@/components/Form/PetProfileForm";
import PetFullDetail from "@/types";

const mockData = {
    "petId": "12345",
    "petName": "Mama",
    "species": "Doggy",
    "gender": "male",
    "age": 3,
    "image": [
        "/img/tom.jpg",
        "/img/garfield.jpg",
        "https://firebasestorage.googleapis.com/v0/b/testupload-c1261.appspot.com/o/pet-image%2F1729715660027-emoji.png?alt=media&token=1f18c991-0c52-4aa9-824d-5d2674c854f2",
        "https://firebasestorage.googleapis.com/v0/b/testupload-c1261.appspot.com/o/pet-image%2F1729712683112-sn-color.jpg?alt=media&token=ab0a9ab2-1209-453e-9d53-e10f0d0a476d"
    ],
    "behaviorDescription": "goofd",
    "vaccinatedComment": "never",
    "__v": 0
}

export default function PetEdit({ params }: { params: { pid: string } }) {

    // TODO: Replace this with fetching logic
    const initialPetData : PetFullDetail = { ...mockData };
    initialPetData.image = convertImage(initialPetData.image)

    function convertImage(image: string[]) {
        return image.map((url: string) => {return {dataURL: url}});
    };

    return (
        <div className="w-full flex justify-center">

            <PetProfileForm formName={`Editing Pet: ${params.pid}`} initialPetData={initialPetData} />

        </div>
    );
}