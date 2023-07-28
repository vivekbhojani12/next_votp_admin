import {
    AuthResponse,
    LoginInput,
    createToken,
    RegisterInput,
    User,
    ChangePasswordInput,
    ForgetPasswordInput,
    VerifyForgetPasswordTokenInput,
    ResetPasswordInput,
    MakeAdminInput,
    BlockUserInput,
    WalletPointsInput,
    UpdateUser,
    VerifyForgetPasswordOtp,
    QueryOptionsType,
    UserPaginator,
    UserQueryOptions,
  } from '@/types';
  import { API_ENDPOINTS } from './api-endpoints';
  import { HttpClient } from './http-client';
  
  export const tokenClient = {
 
    createToken: (variables: createToken) => {
      return HttpClient.post<AuthResponse>(API_ENDPOINTS.CREATE_TOKEN, variables);
    },
  };
  