import { ApiResponse } from 'types/Request';
import { getJson } from 'utils/helpers/localStorage';

import { apiDelete, apiGet, apiPost, apiPut } from './request';

export const registrationValidate = (params: {
  phoneNumber: string;
  registrationNumber: string;
  fio: string;
  email: string;
  password: string;
}) => apiPost<any>('/registration/validate', params);

export const login = (params: { login: string; password: string }) =>
  apiPost<any>('/registration/validate', params);
