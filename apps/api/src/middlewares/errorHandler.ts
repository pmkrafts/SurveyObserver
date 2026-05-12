import { NextFunction, Request, Response } from "express";
import { ApiErrorShape } from "@/types/api.types";
import { errorResponse } from "@/utils/apiResponse";

export function errorHandler(
  err: ApiErrorShape,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  const statusCode = err.statusCode ?? 500;
  const message = statusCode === 500 ? "Internal server error" : err.message;

  res.status(statusCode).json(errorResponse(message));
}
