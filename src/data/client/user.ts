import {
  AuthResponse,
  UpdateToken,
  LoginInput,
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

export const userClient = {
  me: () => {
    return HttpClient.get<User>(API_ENDPOINTS.ME);
  },
  login: (variables: LoginInput) => {
    return HttpClient.post<AuthResponse>(API_ENDPOINTS.TOKEN, variables);
  },
  logout: () => {
    return HttpClient.post<any>(API_ENDPOINTS.LOGOUT, {});
  },
  register: (variables: RegisterInput) => {
    return HttpClient.post<AuthResponse>(API_ENDPOINTS.REGISTER, variables);
  },
  update: (input: UpdateUser) => {
    console.log(input,'At time of update')
    return HttpClient.put<User>(`${API_ENDPOINTS.USERS}`, input);
  },
  updateToken: (input: UpdateToken) => {
    console.log(input,'At time of update<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
    return HttpClient.put<User>(`${API_ENDPOINTS.UPDATE_TOKEN}`, input);
  },
  changePassword: (variables: ChangePasswordInput) => {
    return HttpClient.post<any>(API_ENDPOINTS.CHANGE_PASSWORD, variables);
  },
  forgetPassword: (variables: ForgetPasswordInput) => {
    return HttpClient.post<any>(API_ENDPOINTS.FORGET_PASSWORD, variables);
  },

  verifyForgetPasswordOtp: (variables: VerifyForgetPasswordOtp) => {
    return HttpClient.post<any>(
      API_ENDPOINTS.VERIFY_FORGET_PASSWORD_OTP,
      variables
    );
  },
  verifyForgetPasswordToken: (variables: VerifyForgetPasswordTokenInput) => {
    return HttpClient.post<any>(
      `${API_ENDPOINTS.VERIFY_FORGET_PASSWORD_TOKEN}?token=${variables.token}`,
      variables
    );
  },
  resetPassword: (variables: ResetPasswordInput) => {
    return HttpClient.post<any>(API_ENDPOINTS.RESET_PASSWORD, variables);
  },
  makeAdmin: (variables: MakeAdminInput) => {
    return HttpClient.post<any>(API_ENDPOINTS.MAKE_ADMIN, variables);
  },
  block: (variables: BlockUserInput) => {
    return HttpClient.post<any>(API_ENDPOINTS.BLOCK_USER, variables);
  },
  unblock: (variables: BlockUserInput) => {
    return HttpClient.post<any>(API_ENDPOINTS.UNBLOCK_USER, variables);
  },
  addWalletPoints: (variables: WalletPointsInput) => {
    return HttpClient.post<any>(API_ENDPOINTS.ADD_WALLET_POINTS, variables);
  },
  fetchUsers: ({ name, ...params }: Partial<UserQueryOptions>) => {
    return HttpClient.get<UserPaginator>(API_ENDPOINTS.USERS, {
      searchJoin: 'and',
      with: 'wallet',
      ...params,
      search: HttpClient.formatSearchParams({ name }),
    });
  },
  fetchMessage: () => {
    return HttpClient.get<UserPaginator>(API_ENDPOINTS.MESSAGE_USER);
  },
  fetchUsersPurchasedToken: ({ name, ...params }: Partial<UserQueryOptions>) => {
    return HttpClient.get<UserPaginator>(API_ENDPOINTS.FACTHED_TOKEN_USER, {
      searchJoin: 'and',
      with: 'wallet',
      ...params,
      search: HttpClient.formatSearchParams({ name }),
    });
  },

  fetchClientPurchasedToken: ({ name, ...params }: Partial<UserQueryOptions>) => {
    return HttpClient.get<UserPaginator>(API_ENDPOINTS.FACTHED_TOKEN_CLIENT, {
      searchJoin: 'and',
      with: 'wallet',
      ...params,
      search: HttpClient.formatSearchParams({ name }),
    });
  },
  
  delete({ id }: { id: string }) {
    console.log(id,'the value of _id<<<<<<<<<>>>>>>>>>>>>in delete')
    return HttpClient.delete(`v1/users/:id?_id=${id}`);
  },


  // UserTokenPaginator
  fetchAdmins: ({ ...params }: Partial<UserQueryOptions>) => {
    return HttpClient.get<UserPaginator>(API_ENDPOINTS.ADMIN_LIST, {
      searchJoin: 'and',
      ...params,
    });
  },
  fetchToken: ({ id }: { id: string }) => {
    return HttpClient.get<User>(`${API_ENDPOINTS.GET_TOKEN}?_id=${id}`);
  },


  fetchUser: ({ id }: { id: string }) => {
    return HttpClient.get<User>(`${API_ENDPOINTS.PROFILE_UPDATE}?_id=${id}`);
  },
  resendVerificationEmail: () => {
    return HttpClient.post<any>(API_ENDPOINTS.SEND_VERIFICATION_EMAIL, {});
  },
  updateEmail: ({ email }: { email: string }) => {
    return HttpClient.post<any>(API_ENDPOINTS.UPDATE_EMAIL, { email });
  },
};
