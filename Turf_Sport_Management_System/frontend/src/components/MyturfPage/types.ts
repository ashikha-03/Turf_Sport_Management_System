// src/components/types.ts

export interface TurfDetails {
  id: string;
  turfName: string;
  location: string;
  sports: string[];
  maxMembers: number;
  contactNo: string;
  rating: number;
  price: number;
  imageUrl: string; // Optional, add default value or handle null cases.
  slots: string[]; // Available slots in a string format
}

export interface BookSlotRequest {
  turfId: string;
  date: string;
  numOfDays: number;
  slots: string[];
  role: string;
}

export interface BookSlotResponse {
  status: string;
  message: string;
}

export interface AuthTokenDecoded {
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
  // Add other properties you expect from JWT here
}
