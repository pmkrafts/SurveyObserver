import { NextFunction, Request, Response } from "express";
import { userService } from "@/services/user.service";
import { errorResponse, successResponse } from "@/utils/apiResponse";

export class UserController {
  async getUsers(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const users = await userService.getUsers();
      res.status(200).json(successResponse("Users fetched successfully", users));
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        res.status(400).json(errorResponse("Invalid user id"));
        return;
      }
      const user = await userService.getUserById(id);
      res.status(200).json(successResponse("User fetched successfully", user));
    } catch (error) {
      next(error);
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, email } = req.body as { name?: string; email?: string };

      if (!name || !name.trim()) {
        res.status(400).json(errorResponse("Name is required"));
        return;
      }

      if (!email || !email.trim()) {
        res.status(400).json(errorResponse("Email is required"));
        return;
      }

      const created = await userService.createUser({
        name: name.trim(),
        email: email.trim()
      });

      res.status(201).json(successResponse("User created successfully", created));
    } catch (error) {
      next(error);
    }
  }
}

export const userController = new UserController();
