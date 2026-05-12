import express from "express";
import { errorHandler } from "@/middlewares/errorHandler";
import { notFound } from "@/middlewares/notFound";
import { requestLogger } from "@/middlewares/requestLogger";
import { apiV1Router } from "@/routes/v1";

export const app = express();

// Keep global middleware here so routes stay focused on business behavior.
app.use(requestLogger);
app.use(express.json());
app.use("/api/v1", apiV1Router);

app.use(notFound);
app.use(errorHandler);
