import { Router } from "express";
import { userController } from "@/controllers/user.controller";

const usersRouter = Router();

// Controllers stay thin; they only orchestrate request/response handling.
usersRouter.get("/users", (req, res) => {
  userController.getUsers(req, res);
});

usersRouter.get("/users/:id", (req, res, next) => {
  userController.getUserById(req, res, next);
});

usersRouter.post("/users", (req, res) => {
  userController.createUser(req, res);
});

export { usersRouter };
