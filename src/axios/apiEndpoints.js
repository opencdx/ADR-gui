import { post } from '@/axios/apiInterceptors';

export const Endpoints = {
  login: (params) => post('/iam/user/login', params),
  signup: (params) => post('/iam/user/signup', params),
};
