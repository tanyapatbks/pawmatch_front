export interface PetFullDetail {
  _id: string;
  petName: string;
  species: string;
  gender: string;
  age: number;
  image: any[];
  imagePath: Object;
  behaviorDescription: string;
  vaccinatedComment: string;
}

export interface PetFullDetailM1 {
  petName: string;
  petId: string;
  species: string;
  gender: string;
  age: number;
  image: string;
  behaviorDescription: string;
} // use at get random pet

export interface PetFullDetailM2 {
  userId: string;
  petName: string;
  species: string;
  gender: string;
  age: number;
  image: string[]; // Specify as an array of strings
  behaviorDescription: string;
  vaccinatedComment: string;
}

export interface PetMatchDetail {
  matchId: string,
    matchPetId1: string,
    matchPetName1: string,
    matchUserId1: string,
    matchPetId2: string,
    matchPetName2: string,
    matchUserId2: string,
}