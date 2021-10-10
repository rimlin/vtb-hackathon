import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { environment } from 'utils/environment';
import { ErrorInterceptor } from 'services/errorInterceptor';
import { RequestError } from 'types/Request';
import { ApiError } from 'utils/apiError';

axios.defaults.baseURL = environment.apiUrl;
axios.defaults.headers.common['Content-Type'] = 'application/json';

axios.interceptors.response.use(response => response, ErrorInterceptor);

type SuccessResponse<T> = T;

const handleSuccess = <T>(response: AxiosResponse<T>): SuccessResponse<T> => {
  return response?.data;
};

const handleError = (error: AxiosError<RequestError>) => {
  if (axios.isCancel(error)) {
    throw error;
  }

  let apiError: RequestError;
  let backendError = error.response?.data;
  let frontInfo = {};

  if (error.isAxiosError) {
    frontInfo = {
      method: error.config.method,
      baseURL: error.config.baseURL,
      url: error.config.url,
      data: error.config.data,
      response: {
        headers: error.response?.headers,
        status: error.response?.status,
      },
    };
  }

  const defaultErrorMessage = error.message || 'Внутренняя ошибка';

  if (typeof backendError === 'string') {
    apiError = { message: backendError || defaultErrorMessage };
  } else {
    apiError = {
      ...backendError,
      message: backendError?.message || defaultErrorMessage,
    };
  }

  apiError.front_info = frontInfo;

  throw new ApiError({ error: apiError });
};

const tryCatchWrapper = <T>(request: Promise<AxiosResponse<T>>) =>
  request.then(handleSuccess).catch(handleError);

export const apiGet = <T>(
  path: string,
  config?: AxiosRequestConfig
): Promise<SuccessResponse<T>> => {
  return tryCatchWrapper<T>(axios.get<T>(path, { withCredentials: true, ...config }));
};

export const apiPost = <T>(
  path: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<SuccessResponse<T>> => {
  return tryCatchWrapper<T>(
    axios.post<T>(path, data, { withCredentials: true, ...config })
  );
};

export const apiPut = <T>(
  path: string,
  data: any,
  config?: AxiosRequestConfig
): Promise<SuccessResponse<T>> => {
  return tryCatchWrapper<T>(
    axios.put<T>(path, data, { withCredentials: true, ...config })
  );
};

export const apiDelete = <T>(
  path: string,
  config?: AxiosRequestConfig
): Promise<SuccessResponse<T>> => {
  return tryCatchWrapper<T>(axios.delete<T>(path, { withCredentials: true, ...config }));
};
