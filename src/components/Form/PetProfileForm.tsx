'use client'

import TextInput from "./TextInput";
import Select from "./Select";
import ImageUploadField from "./ImageUploadField";
import ButtonType1Med from "../Button/ButtonType1Med";
import ButtonType2Med from "../Button/ButtonType2Med";
import { useState } from "react";
import { MouseEvent } from 'react';
import { useRouter } from "next/navigation";
import { PetFullDetail } from "@/types";
import createPet from "@/libs/petService/createPet";
import updatePet from "@/libs/petService/updatePet";

interface PetProfileField {
  petName: string;
  species: string;
  gender: string;
  age: string;
  behaviorDescription: string;
  vaccinatedComment: string;
}

export default function PetProfileForm({
  formName,
  initialPetData,
}: {
  formName: string;
  initialPetData?: PetFullDetail;
}) {

  const router = useRouter();

  const [formData, setFormData] = useState({
    petName: initialPetData?.petName || "",
    species: initialPetData?.species || "",
    gender: initialPetData?.gender || "",
    age: initialPetData?.age || 0,
    behaviorDescription: initialPetData?.behaviorDescription || "",
    vaccinatedComment: initialPetData?.vaccinatedComment || ""
  });

  const [images, setImages] = useState<any[]>(initialPetData?.image || []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {

    const formDataWithFiles = new FormData();

    Object.keys(formData).forEach(key => {
      formDataWithFiles.append(key, formData[key as keyof PetProfileField] as string);
    });

    const bodyImages: string[] = [];

    images.forEach(async (image, index) => {
      if (!image.file) {
        bodyImages.push(initialPetData?.imagePath[image.dataURL]);
        return;
      }
      bodyImages.push(image.file.name);
      formDataWithFiles.append('images', image.file);
    });

    if (!initialPetData) {
      await createPet(formDataWithFiles);
    } else {
      console.log(JSON.stringify(bodyImages));
      formDataWithFiles.append('image', JSON.stringify(bodyImages));
      await updatePet(initialPetData._id, formDataWithFiles);
    }

    router.push("/mypets");

  };

  const handleCancel = () => {

    setFormData({
      petName: '',
      species: '',
      gender: '',
      age: 0,
      behaviorDescription: '',
      vaccinatedComment: ''
    });

    router.push("/mypets");

  }

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
  ];

  const vaccinationStatusOptions = [
    { value: 'complete', label: 'Complete' },
    { value: 'pending', label: 'Pending' },
    { value: 'never', label: 'Never' },
  ];

  return (

    <div className="w-[550px] flex flex-col gap-y-7 pb-10">

      <div className="font-bold text-2xl text-rose-600">
        {formName}
      </div>

      <TextInput fieldName="Pet name" name="petName" onChange={handleInputChange} value={formData.petName} />
      <TextInput fieldName="Species" name="species" onChange={handleInputChange} value={formData.species} />
      <Select fieldName="Gender" options={genderOptions} name="gender" onChange={handleInputChange} value={formData.gender} />
      <TextInput fieldName="Age" type="number" name="age" onChange={handleInputChange} value={formData.age} />
      <TextInput fieldName="Behavior description" name="behaviorDescription" onChange={handleInputChange} value={formData.behaviorDescription} />
      <Select fieldName="Vaccination status" options={vaccinationStatusOptions} name="vaccinatedComment" onChange={handleInputChange} value={formData.vaccinatedComment} />
      <ImageUploadField images={images} setImages={setImages} />

      <div className="w-full flex flex-row-reverse gap-2">
        <ButtonType2Med name="Register" onClick={handleSubmit} />
        <ButtonType1Med name="Cancel" onClick={handleCancel} />
      </div>

    </div>

  );
}