// ==================== Request Payloads ====================

export interface RegisterPayload {
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

// ==================== Response Types ====================

export interface User {
  id: string;
  email: string;
  createdAt: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface LoginResponse {
  message: string;
  user: User;
  token?: string;
}

// ==================== Error Types ====================

export interface ApiError {
  message: string;
  error?: string;
  statusCode?: number;
}

export interface ValidationError {
  field: string;
  message: string;
}

// ==================== API State Types ====================

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
}
