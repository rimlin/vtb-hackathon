export interface ApiResponse<T> {
  status?: string;
  message?: string;
  data: T;
}

export type RequestError = {
  message: string;
  status?: string;
  front_info?: any;
};

export interface ApiErrorConstruction {
  error: RequestError;
  isHandled?: boolean;
}
