import { ApiErrorResponse, ApiSuccessResponse } from "@/types/api.types";

export function successResponse<T>(message: string, data?: T): ApiSuccessResponse<T> {
  return {
    success: true,
    message,
    data
  };
}

export function errorResponse(message: string): ApiErrorResponse {
  return {
    success: false,
    message
  };
}
