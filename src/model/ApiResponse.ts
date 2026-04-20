export type ApiResponse<T> =
  | {
      data: T;
      error: null;
      status: number;
    }
  | {
      data: null;
      error: ApiError;
      status: number;
    };

type ApiError = {
  message: string;
  code: string;
};
