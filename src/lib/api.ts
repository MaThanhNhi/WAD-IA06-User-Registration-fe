import axios from "axios";
import type {
  RegisterPayload,
  RegisterResponse,
  LoginPayload,
  LoginResponse,
  ApiError,
} from "../types/auth";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
  // withCredentials: true, // no auth yet
});

// TODO: Request Interceptor - Implement when authentication is required (automatically adds JWT token to protected endpoints)
// TODO: Response Interceptor - Implement when protected endpoints exist (handles authentication errors and formats API errors)

export const userApi = {
  register: async (data: RegisterPayload): Promise<RegisterResponse> => {
    const response = await apiClient.post<RegisterResponse>(
      "/user/register",
      data,
    );
    return response.data;
  },

  login: async (data: LoginPayload): Promise<LoginResponse> => {
    // Mock login - replace with actual endpoint when backend is ready
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          message: "Login successful",
          user: {
            id: "mock-id",
            email: data.email,
            createdAt: new Date().toISOString(),
          },
          token: "mock-jwt-token",
        });
      }, 1000);
    });
  },
};

export { API_URL };
export type { ApiError };
