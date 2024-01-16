import { User } from "@prisma/client";
import prisma from "../../../config/prisma";

export async function addUser(userData: User) {
  const newUser = await prisma.user.create({
    data: userData,
  });
  return newUser;
}

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
}
