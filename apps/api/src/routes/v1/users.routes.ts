import { Router } from "express";
import { userController } from "@/controllers/user.controller";

const usersRouter = Router();

// Controllers stay thin; they only orchestrate request/response handling.
usersRouter.get("/users", (req, res, next) => {
  userController.getUsers(req, res, next);
});

usersRouter.get("/users/:id", (req, res, next) => {
  userController.getUserById(req, res, next);
});

usersRouter.post("/users", (req, res, next) => {
  userController.createUser(req, res, next);
});

export { usersRouter };
