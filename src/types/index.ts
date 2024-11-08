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

export default interface PetRandomFilter {
  species: string;
  gender: string;
  ageFrom: number;
  ageTo: number;
  vaccinatedComment: string;
}
