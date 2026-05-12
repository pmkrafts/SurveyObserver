/**
 * Integration tests for Users API
 * Requires Docker PostgreSQL running on port 5433 (docker-compose up -d at root)
 */
import request from "supertest";
import { app } from "@/app";
import { prisma } from "@/config/prisma";

beforeAll(async () => {
  // Clear users table before the test suite
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.user.deleteMany();
  await prisma.$disconnect();
});

describe("Users API — PostgreSQL integration", () => {
  describe("GET /api/v1/users", () => {
    it("returns empty list when no users exist", async () => {
      const res = await request(app).get("/api/v1/users");

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toEqual([]);
    });

    it("returns list after seeding users", async () => {
      await prisma.user.createMany({
        data: [
          { name: "Ava Stone", email: "ava@example.com" },
          { name: "Noah Reed", email: "noah@example.com" }
        ]
      });

      const res = await request(app).get("/api/v1/users");

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveLength(2);
      expect(res.body.data[0]).toMatchObject({ name: "Ava Stone", email: "ava@example.com" });
    });
  });

  describe("POST /api/v1/users", () => {
    it("returns 400 when name is missing", async () => {
      const res = await request(app).post("/api/v1/users").send({ email: "test@example.com" });

      expect(res.status).toBe(400);
      expect(res.body).toEqual({ success: false, message: "Name is required" });
    });

    it("returns 400 when email is missing", async () => {
      const res = await request(app).post("/api/v1/users").send({ name: "Test User" });

      expect(res.status).toBe(400);
      expect(res.body).toEqual({ success: false, message: "Email is required" });
    });

    it("creates and persists a user", async () => {
      const res = await request(app)
        .post("/api/v1/users")
        .send({ name: "Maya Kim", email: "maya@example.com" });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toMatchObject({ name: "Maya Kim", email: "maya@example.com" });
      expect(typeof res.body.data.id).toBe("number");

      // Verify it actually landed in the database
      const inDb = await prisma.user.findUnique({ where: { id: res.body.data.id } });
      expect(inDb).not.toBeNull();
      expect(inDb?.email).toBe("maya@example.com");
    });

    it("returns 500 on duplicate email (unique constraint)", async () => {
      await prisma.user.create({ data: { name: "Duplicate", email: "dup@example.com" } });

      const res = await request(app)
        .post("/api/v1/users")
        .send({ name: "Duplicate2", email: "dup@example.com" });

      expect(res.status).toBe(500);
      expect(res.body.success).toBe(false);
    });
  });

  describe("GET /api/v1/users/:id", () => {
    it("returns 400 for non-numeric id", async () => {
      const res = await request(app).get("/api/v1/users/abc");

      expect(res.status).toBe(400);
      expect(res.body).toEqual({ success: false, message: "Invalid user id" });
    });

    it("returns 404 for non-existent user", async () => {
      const res = await request(app).get("/api/v1/users/99999");

      expect(res.status).toBe(404);
      expect(res.body).toEqual({ success: false, message: "User not found" });
    });

    it("returns user by id", async () => {
      const created = await prisma.user.create({
        data: { name: "Fetch Me", email: "fetchme@example.com" }
      });

      const res = await request(app).get(`/api/v1/users/${created.id}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toMatchObject({ id: created.id, name: "Fetch Me" });
    });
  });
});
