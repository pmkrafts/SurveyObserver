import { NextFunction, Request, Response } from "express";
import { userService } from "@/services/user.service";
import { errorResponse, successResponse } from "@/utils/apiResponse";

export class UserController {
  getUsers(_req: Request, res: Response): void {
    const users = userService.getUsers();
    res.status(200).json(successResponse("Users fetched successfully", users));
  }

  getUserById(req: Request, res: Response, next: NextFunction): void {
    try {
      const user = userService.getUserById(req.params.id);
      res.status(200).json(successResponse("User fetched successfully", user));
    } catch (error) {
      next(error);
    }
  }

  createUser(req: Request, res: Response): void {
    const { name, email } = req.body as { name?: string; email?: string };

    if (!name || !name.trim()) {
      res.status(400).json(errorResponse("Name is required"));
      return;
    }

    if (!email || !email.trim()) {
      res.status(400).json(errorResponse("Email is required"));
      return;
    }

    const created = userService.createUser({
      name: name.trim(),
      email: email.trim()
    });

    res.status(201).json(successResponse("User created successfully", created));
  }
}

export const userController = new UserController();
