import { StoragePerson } from "../storage/clientData";

export interface Product {
  id: number;
  name: string;
  time: number; // минуты
}

export interface RequiredDocuments {
  product: string;
  documents: string[];
}

export interface PostMeeting {
  meeting: Meeting;
  user: {
    name: string;
    surname: string;
    middle_name: string;
    phone_number: string;
  };
  additional_users: {
    name: string;
    surname: string;
    middle_name: string;
    phone_number: string;
    role: string;
    passport_data: string;
  }[];
  products: {
    name: string;
  }[];
}

export interface User {
  id: string;
  name: string;
  surname: string;
  middle_name: string;
  phone_number: string;
}

export interface Meeting {
  start_datetime: string;
  place: string;
}
export interface CreatedMeeting {
  meeting: Meeting;
  user: User;
  additional_users: User[];
  products: Omit<Product, "id">[];
}

export interface ServerMeeting extends Pick<CreatedMeeting, "meeting"> {
  courier: User;
  products: Product[];
}

export interface AdditionalUser extends User {
  role: string;
  passport_data: string;
}

export interface FullMeeting extends Meeting {
  end_datetime: string;
}

export interface AllMeetingsMeeting {
  user: User;
  meeting: FullMeeting;
  courier: StoragePerson;
  additional_users: AdditionalUser[];
  products: Product[];
}
export type AllMeetings = Record<string, AllMeetingsMeeting>;

export interface freeSlots {
  free_slots: string[];
}

export interface PatchData {
  additional_users: Omit<AdditionalUser, "id">[];
  start_datetime: string;
  products: { name: string }[];
  place: string;
}
