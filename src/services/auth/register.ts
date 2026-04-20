import { ApiResponse } from "@/model/ApiResponse";
import { registerRequest, registerResponse } from "@/model/auth/register.model";
import { RegisterSchemaType } from "@/validation/auth.schema";

export const RegisterService = {
  async register(
    request: Readonly<RegisterSchemaType>,
  ): Promise<ApiResponse<registerResponse>> {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          data: null,
          status: response.status,
          error: {
            message: data.message,
            code: data.code,
          },
        };
      }

      return {
        data: data,
        status: response.status,
        error: null,
      };
    } catch (err: any) {
      return {
        data: null,
        status: 500,
        error: {
          message: err.message,
          code: "INTERNAL_SERVER_ERROR",
        },
      };
    }
  },
};
