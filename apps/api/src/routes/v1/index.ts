import { Router } from "express";
import { healthRouter } from "@/modules/health";
import { usersRouter } from "@/modules/users";

export const apiV1Router = Router();

// API versioning keeps future breaking changes isolated in new route trees.
apiV1Router.use(healthRouter);
apiV1Router.use(usersRouter);
