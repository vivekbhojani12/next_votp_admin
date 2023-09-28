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
      console.log(variables,'Variables<<<<<<<<>>>>>>>>>>>>>>>>')
      return HttpClient.post(API_ENDPOINTS.CREATE_TOKEN, variables);
    },
    fetchTokenConnectedDevice: (id :any) => {
      console.log(id ,'the value of  token id <<<<<<<<<<<token Id>>>>>>>>>>>>>>>>>>>>>')
      return HttpClient.get<createToken>(`${API_ENDPOINTS.CONNECTED_TOKEN_VIA_DEVICE}?token=${id}`);
    },
    checkToken: (id :any) => {
      console.log(id,'the value of token in checktoken function')
      return HttpClient.get<createToken>(`${API_ENDPOINTS.CHECK_TOKEN}?token=${id}`);
    }
  };
  