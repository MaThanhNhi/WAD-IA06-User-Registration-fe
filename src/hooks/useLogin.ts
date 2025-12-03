import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { userApi } from "../lib/api";
import type { LoginPayload, LoginResponse } from "../types/auth";
import type { ApiError } from "../types/error";

interface UseLoginOptions {
  onSuccess?: (data: LoginResponse) => void;
  onError?: (error: ApiError) => void;
  onSettled?: () => void;
}

export const useLogin = (
  options?: UseLoginOptions,
): UseMutationResult<LoginResponse, ApiError, LoginPayload> => {
  return useMutation<LoginResponse, ApiError, LoginPayload>({
    mutationFn: (data: LoginPayload) => userApi.login(data),

    onSuccess: (data) => {
      // TODO: Store token if provided
      options?.onSuccess?.(data);
    },

    onError: (error) => {
      options?.onError?.(error);
    },

    onSettled: () => {
      options?.onSettled?.();
    },

    retry: false, // Don't retry on failure
    networkMode: "online",
  });
};

export type UseLoginReturn = ReturnType<typeof useLogin>;
