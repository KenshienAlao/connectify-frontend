import { apiClient } from "@/lib/apiClient";
import { ApiResponse } from "@/model/ApiResponse";
import { LoginResponse } from "@/model/auth/login.model";
import { RegisterResponse } from "@/model/auth/register.model";
import { LoginSchemaType, RegisterSchemaType } from "@/validation/auth.schema";

export const AuthService = {
  async register(
    request: Readonly<RegisterSchemaType>,
  ): Promise<ApiResponse<RegisterResponse>> {
    return await apiClient.post<RegisterResponse>(
      "/api/auth/register",
      request,
    );
  },

  async login(
    request: Readonly<LoginSchemaType>,
  ): Promise<ApiResponse<LoginResponse>> {
    return await apiClient.post<LoginResponse>("/api/auth/login", request);
  },
};
