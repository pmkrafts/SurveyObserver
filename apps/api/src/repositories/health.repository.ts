export class HealthRepository {
  getStatus(): string {
    return "Server running";
  }
}

export const healthRepository = new HealthRepository();
