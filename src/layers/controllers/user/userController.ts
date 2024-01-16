import express, { NextFunction, Request, Response } from "express";
import {
  addUserService,
  getUserByEmailService,
} from "../../services/user/userService";

import { BaseController } from "../baseController";
import { addUserSchema } from "../../../schemas/zodSchemas/addUserSchema";
import { User } from "@prisma/client";

const router = express.Router();

router.get(
  "/:email",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //@ts-ignore
      const email = req.params.email;
      const user = await getUserByEmailService(email);
      res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  }
);

router.post(
  "/new-user",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newUserData: User = req.body;
      const validatedData = addUserSchema.parse(newUserData);
      const newUser = await addUserService(validatedData);

      BaseController.apiResultToStatusCode(res, newUser);
      res.json(newUser);
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
