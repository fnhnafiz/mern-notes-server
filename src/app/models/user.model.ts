import { Model, model, Schema } from "mongoose";
import {
  IAddress,
  IUser,
  UserInstanceMethods,
  UserStaticMethods,
} from "../interfaces/user.interface";
import validator from "validator";
import bcrypt from "bcryptjs";
import { Note } from "./notes.model";

const addressSchema = new Schema<IAddress>(
  {
    city: { type: String },
    street: { type: String },
    postcode: { type: Number },
  },
  {
    _id: false,
  }
);

const userSchema = new Schema<IUser, UserStaticMethods, UserInstanceMethods>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    age: {
      type: Number,
      min: [18, "Age altest 16 {VALUE}"],
      max: [35, "Age altest 30 {VALUE}"],
    },
    email: {
      type: String,
      unique: [true, "why use is same email"],
      required: true,
      trim: true,
      //   validate: {
      //     validator: function (val) {
      //       return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(val);
      //     },
      //     message: function (props) {
      //       return `Email is ${props.value} not valid`;
      //     },
      //   },
      validate: [validator.isEmail, "Invalid email provied"],
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    address: {
      type: addressSchema,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.method("hashPassword", async function (password: string) {
  const pass = await bcrypt.hash(password, 10);
  return pass;
});

userSchema.static("hashPassword", async function (password: string) {
  const pass = await bcrypt.hash(password, 10);
  return pass;
});

// hash pasword with pre save hooks in mongoose;
userSchema.pre("save", async function () {
  // console.log("Inside the pre save hooks");
  // console.log("This is:", this);
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.post("findOneAndDelete", async function (doc) {
  // console.log("This is deleted user with findOneAndDeleted:", doc);
  if (doc) {
    await Note.deleteMany({ user: doc._id });
  }
});

userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

export const User = model<IUser, UserStaticMethods>(
  "User",
  userSchema,
  "users"
);
