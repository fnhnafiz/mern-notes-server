import { Model } from "mongoose";

export interface IAddress {
  city: string;
  street: string;
  postcode: number;
}

export interface IUser {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
  role: "user" | "admin";
  address: IAddress;
}

export interface UserInstanceMethods {
  hashPassword(password: string): string;
}

export interface UserStaticMethods extends Model<IUser> {
  hashPassword(password: string): string;
}
