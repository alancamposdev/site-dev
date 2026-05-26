import { Router } from "express";
import { createUser, deleteUser, getUserById, listUsers, updateUser } from "../controllers/userController.ts";

const userRouter = Router();

userRouter.get("/", listUsers);
userRouter.post("/", createUser);
userRouter.get("/:id", getUserById);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;
