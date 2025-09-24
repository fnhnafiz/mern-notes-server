import express, { Request, Response } from "express";
import { User } from "../models/user.model";
import z from "zod";

export const userRoutes = express.Router();

const userZodeSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  age: z.number(),
  email: z.string(),
  password: z.string(),
  role: z.string().optional(),
});

userRoutes.post("/create-user", async (req: Request, res: Response) => {
  try {
    // const zodBody = await userZodeSchema.parseAsync(req.body);
    // console.log("Zod Body:", zodBody);

    const body = req.body;

    // const password = await bcrypt.hash(body.password, 10);

    // console.log(password);

    // this is a build in custom instance method

    // const newUser = new User(body);

    // const password = await newUser.hashPassword(body.password);
    // newUser.password = password;
    // await newUser.save();

    // this is built in custom static methods
    // const password = await User.hashPassword(body.password);
    // console.log("This is a static hashpassword:", password);
    // body.password = password;
    const newUser = await User.create(body);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      User: newUser,
    });
  } catch (error: any) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: error.message,
      User: error,
    });
  }
});
userRoutes.get("/", async (req: Request, res: Response) => {
  const users = await User.find({}).sort({ firstName: "asc" });
  res.status(201).json({
    success: true,
    message: "User fetch successfully",
    User: users,
  });
});
userRoutes.get("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const singleUser = await User.findById(userId);
  res.status(201).json({
    success: true,
    message: "Find single user successfully",
    singleUser: singleUser,
  });
});
userRoutes.patch("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const newUser = req.body;
  const updateUser = await User.findByIdAndUpdate(userId, newUser, {
    new: true,
  });
  res.status(201).json({
    success: true,
    message: "Update user data successfully",
    updateUserList: updateUser,
  });
});
userRoutes.delete("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  // const deletedUser = await User.findByIdAndDelete(userId);
  const deletedUser = await User.findOneAndDelete({ _id: userId });
  res.status(201).json({
    success: true,
    message: "Delete user data successfully",
    deleteUser: deletedUser,
  });
});
