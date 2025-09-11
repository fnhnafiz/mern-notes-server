import express, { Request, Response } from "express";
import { User } from "../models/user.model";
export const userRoutes = express.Router();

userRoutes.post("/create-user", async (req: Request, res: Response) => {
  const user = req.body;
  const newUser = await User.create(user);
  res.status(201).json({
    success: true,
    message: "User created successfully",
    User: newUser,
  });
});
userRoutes.get("/", async (req: Request, res: Response) => {
  const users = await User.find({});
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
  const deleteduser = await User.findByIdAndDelete(userId);
  res.status(201).json({
    success: true,
    message: "Delete user data successfully",
    deleteUser: deleteduser,
  });
});
