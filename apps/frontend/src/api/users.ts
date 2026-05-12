// In dev the Vite proxy forwards /api/* → http://localhost:4000, so use relative URL.
// Override with VITE_API_URL for production builds.
const BASE_URL = (import.meta.env.VITE_API_URL as string) ?? "";

export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiSuccess<T> {
  success: true;
  message: string;
  data: T;
}

export interface ApiError {
  success: false;
  message: string;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

async function request<T>(path: string, init?: RequestInit): Promise<ApiSuccess<T>> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init
  });

  const body: ApiResponse<T> = await res.json();

  if (!body.success) {
    throw new Error(body.message);
  }

  return body;
}

// ─── Users ───────────────────────────────────────────────────────────────────

export async function getUsers(): Promise<User[]> {
  const { data } = await request<User[]>("/api/v1/users");
  return data;
}

export async function getUserById(id: number): Promise<User> {
  const { data } = await request<User>(`/api/v1/users/${id}`);
  return data;
}

export async function createUser(payload: { name: string; email: string }): Promise<User> {
  const { data } = await request<User>("/api/v1/users", {
    method: "POST",
    body: JSON.stringify(payload)
  });
  return data;
}
