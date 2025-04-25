// src/components/TurfDetails/types.ts

// src/components/TurfDetails/types.ts

export interface TurfDetails {
  imageUrl: any;
  id:string;
  location: string;
  sports: string[]; // Array of sports (could be one or more)
  maxMembers: number;
  turfName: string;
  contactNo: string;
  rating: number;
  price: number;
  slots: string[]; // Array of time slots
}
