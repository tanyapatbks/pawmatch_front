export default interface PetFullDetail {
  petId: string;
  petName: string;
  species: string;
  gender: string;
  age: number;
  image: any[];
  behaviorDescription: string;
  vaccinatedComment: string;
}

export default interface PetFullDetailM2 {
  userId: string;
  petName: string;
  species: string;
  gender: string;
  age: number;
  image: any[];
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
/*userId: {
    type: String,
    required: true,
  },
  petName: {
    type: String,
    required: true,
  },
  species: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
  image: {
    type: [String],
  },
  behaviorDescription: {
    type: String,
  },
  vaccinatedComment: {
    type: String,
    enum: ["complete", "pending", "never"],
    required: true,
  } */
