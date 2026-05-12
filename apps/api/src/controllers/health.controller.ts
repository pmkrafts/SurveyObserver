import { Request, Response } from "express";
import { healthService } from "@/services/health.service";
import { successResponse } from "@/utils/apiResponse";

export class HealthController {
  getHealth(_req: Request, res: Response): void {
    const message = healthService.getHealthMessage();
    res.status(200).json(successResponse(message));
  }
}

export const healthController = new HealthController();
