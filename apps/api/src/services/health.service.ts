import { healthRepository } from "@/repositories/health.repository";

export class HealthService {
  getHealthMessage(): string {
    return healthRepository.getStatus();
  }
}

export const healthService = new HealthService();
