import { Request, Response } from "express";
import prisma from "../db/prismaClient";

export const listUsers = async (_req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    return res.json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to list users" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to get user" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, passwordHash, role } = req.body;
    const user = await prisma.user.create({
      data: { name, email, passwordHash, role },
    });
    return res.status(201).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create user" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { name, email, passwordHash, role } = req.body;
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: { name, email, passwordHash, role },
    });
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update user" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    await prisma.user.delete({
      where: { id: req.params.id },
    });
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete user" });
  }
};
