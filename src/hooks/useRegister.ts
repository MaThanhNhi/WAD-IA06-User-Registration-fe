import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { userApi } from "../lib/api";
import type {
  RegisterPayload,
  RegisterResponse,
  ApiError,
} from "../types/auth";

interface UseRegisterOptions {
  onSuccess?: (data: RegisterResponse) => void;
  onError?: (error: ApiError) => void;
  onSettled?: () => void;
}

export const useRegister = (
  options?: UseRegisterOptions,
): UseMutationResult<RegisterResponse, ApiError, RegisterPayload> => {
  return useMutation<RegisterResponse, ApiError, RegisterPayload>({
    mutationFn: (data: RegisterPayload) => userApi.register(data),

    onSuccess: (data) => {
      console.log("✅ Registration successful:", data);
      options?.onSuccess?.(data);
    },

    onError: (error) => {
      console.error("❌ Registration failed:", error);
      options?.onError?.(error);
    },

    onSettled: () => {
      options?.onSettled?.();
    },

    retry: false, // Don't retry on failure (user input errors)
    networkMode: "online", // Only run when online
  });
};

/**
 * Hook return type helper for consumers
 */
export type UseRegisterReturn = ReturnType<typeof useRegister>;
