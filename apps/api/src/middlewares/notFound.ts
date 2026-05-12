import { NextFunction, Request, Response } from "express";
import { AppError } from "@/utils/appError";

export function notFound(req: Request, _res: Response, next: NextFunction): void {
  next(new AppError(`Route not found: ${req.originalUrl}`, 404));
}
