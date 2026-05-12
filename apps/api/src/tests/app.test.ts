import request from "supertest";
import { app } from "@/app";
import { prisma } from "@/config/prisma";

beforeAll(async () => {
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.user.deleteMany();
  await prisma.$disconnect();
});

beforeEach(async () => {
  await prisma.user.deleteMany();
});

describe("API starter", () => {
  it("GET /api/v1/health returns server status", async () => {
    const response = await request(app).get("/api/v1/health");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: "Server running"
    });
  });

  it("GET /api/v1/users returns users list", async () => {
    await prisma.user.create({ data: { name: "Seed User", email: "seed@example.com" } });

    const response = await request(app).get("/api/v1/users");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  it("POST /api/v1/users validates required fields", async () => {
    const response = await request(app).post("/api/v1/users").send({ email: "x@example.com" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      success: false,
      message: "Name is required"
    });
  });

  it("POST /api/v1/users creates user", async () => {
    const response = await request(app)
      .post("/api/v1/users")
      .send({ name: "Maya", email: "maya@example.com" });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.name).toBe("Maya");
    expect(response.body.data.email).toBe("maya@example.com");
  });
});

