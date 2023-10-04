import { AUTH_CRED } from '@/utils/constants';
import { Routes } from '@/config/routes';
import Cookies from 'js-cookie';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { API_ENDPOINTS } from './client/api-endpoints';
import { userClient } from './client/user';
import { User, QueryOptionsType, UserPaginator, BlockUserInput } from '@/types';
import { mapPaginatorData } from '@/utils/data-mappers';
import axios from 'axios';
import { setEmailVerified } from '@/utils/auth-utils';
import { HttpClient } from './client/http-client';

export const useMeQuery = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useQuery<User, Error>([API_ENDPOINTS.ME], userClient.me, {
    retry: false,

    onSuccess: () => {
      if (router.pathname === Routes.verifyEmail) {
        setEmailVerified(true);
        router.replace(Routes.dashboard);
      }
    },

    onError: (err) => {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 409) {
          setEmailVerified(false);
          router.replace(Routes.verifyEmail);
          return;
        }
        queryClient.clear();
        router.replace(Routes.login);
      }
    },
  });
};

export function useLogin() {
  return useMutation(userClient.login);
}

export const useLogoutMutation = () => {
  const router = useRouter();
  const { t } = useTranslation();

  return useMutation(userClient.logout, {
    onSuccess: () => {
      Cookies.remove(AUTH_CRED);
      router.replace(Routes.login);
      toast.success(t('common:successfully-logout'));
    },
  });
};

export const useRegisterMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { t } = useTranslation();

  return useMutation(userClient.register, {
    onSuccess: (data) => {
      if (data?.flag === false) {
        toast.error(t(`${data?.message}`));
      } else {
        toast.success(t('common:successfully-created'));
        router.replace(Routes.user.list);
      }
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.REGISTER);
    },
  });
};

export const useUpdateUserMutation = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation(userClient.update, {
    onSuccess: () => {
      toast.success(t('common:successfully-updated'));
      router.replace(Routes.dashboard);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.ME);
      queryClient.invalidateQueries(API_ENDPOINTS.USERS);
    },
  });
};

export const useUpdateTOkenMutation = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation(userClient.updateToken, {
    onSuccess: (data) => {
      console.log(data,'at the time of updating')
      if(data?.data){
      toast.success(t('common:successfully-updated'));}
      else{
        toast.error(`${data?.message}`)
      }
      router.replace(Routes.dashboard);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.ME);
      queryClient.invalidateQueries(API_ENDPOINTS.FACTHED_TOKEN_USER);
    },
  });
};

export const checkToken = (id:any) => {
  console.log(id,'the value of token')
  return useQuery<User, Error>(
    [`${API_ENDPOINTS.CHECK_TOKEN}?token=${id}`, id],
      () => userClient.checkToken(id),
      {
        enabled: Boolean(id),
      }
    );
  };


export const useUpdateUserEmailMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation(userClient.updateEmail, {
    onSuccess: () => {
      toast.success(t('common:successfully-updated'));
    },
    onError: (error) => {
      const {
        response: { data },
      }: any = error ?? {};

      toast.error(data?.message);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.ME);
      queryClient.invalidateQueries(API_ENDPOINTS.USERS);
    },
  });
};

export const useChangePasswordMutation = () => {
  return useMutation(userClient.changePassword);
};

export const useForgetPasswordMutation = () => {
  return useMutation(userClient.forgetPassword);
};

export const useVerifyOtpMutation = () => {
  return useMutation(userClient.verifyForgetPasswordOtp);
};
export const useResendVerificationEmail = () => {
  const { t } = useTranslation('common');
  return useMutation(userClient.resendVerificationEmail, {
    onSuccess: () => {
      toast.success(t('common:PICKBAZAR_MESSAGE.EMAIL_SENT_SUCCESSFUL'));
    },
    onError: () => {
      toast(t('common:PICKBAZAR_MESSAGE.EMAIL_SENT_FAILED'));
    },
  });
};

export const useVerifyForgetPasswordTokenMutation = () => {
  return useMutation(userClient.verifyForgetPasswordToken);
};

export const useResetPasswordMutation = () => {
  return useMutation(userClient.resetPassword);
};

export const useMakeOrRevokeAdminMutation = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation(userClient.makeAdmin, {
    onSuccess: () => {
      toast.success(t('common:successfully-updated'));
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.USERS);
    },
  });
};

export const useBlockUserMutation = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation(userClient.block, {
    onSuccess: () => {
      toast.success(t('common:successfully-block'));
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.USERS);
      queryClient.invalidateQueries(API_ENDPOINTS.STAFFS);
    },
  });
};

export const useUnblockUserMutation = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation(userClient.unblock, {
    onSuccess: () => {
      toast.success(t('common:successfully-unblock'));
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.USERS);
      queryClient.invalidateQueries(API_ENDPOINTS.STAFFS);
    },
  });
};

export const useAddWalletPointsMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation(userClient.addWalletPoints, {
    onSuccess: () => {
      toast.success(t('common:successfully-updated'));
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.USERS);
    },
  });
};

export const useUserUpdateQuery = ({ id }: { id: string }) => {
  return useQuery<User, Error>(
    [`${API_ENDPOINTS.PROFILE_UPDATE}?_id=${id}`, id],
    () => userClient.fetchUser({ id }),
    {
      enabled: Boolean(id),
    }
  );
};


export const useTokenUpdateQuery = ({ id }: { id: string }) => {
  return useQuery<User, Error>(
    [`${API_ENDPOINTS.GET_TOKEN}?_id=${id}`, id],
    () => userClient.fetchToken({ id }),
    {
      enabled: Boolean(id),
    }
  );
};

// export const deleteQuery = async ({ id }: { id: string }) => {
//   try {
//     const response = await HttpClient.delete<boolean>(
//       `${API_ENDPOINTS.DELETE_TOKEN}?_id=${id}`
//     );
    
    
//     return response;
//   } catch (error) {
//     console.error('Error while deleting user:', error);
//     throw error;
//   }
// };


export const deleteQuery = async ({ id }: { id: string }) => {

  try {
    const response = await HttpClient.delete<boolean>(
      `${API_ENDPOINTS.DELETE_TOKEN}?_id=${id}`
    );
    return response;
  } catch (error) {
    console.error('Error while deleting user:', error);
    throw error;
  }
};

export const useUsersQuery = (params: Partial<QueryOptionsType>) => {
  console.log(params, 'all params while pagination');
  const { data, isLoading, error } = useQuery<UserPaginator, Error>(
    [API_ENDPOINTS.USERS, params],
    () => userClient.fetchUsers(params),
    {
      keepPreviousData: true,
    }
  );

  return {
    users: data?.data ?? [],
    paginatorInfo: mapPaginatorData(data as any),
    loading: isLoading,
    error,
  };
};

export const useUsersTokenCount = () => {
 
  const { data, isLoading, error } = useQuery(
    [API_ENDPOINTS.TOKEN_DETAILS_COUNT],
    () => userClient.fetchTokenCounting(),
    {
      keepPreviousData: true,
    }
  );

  return {
    user: data,
    loading: isLoading,
    error,
  };
};

// fetchTokenCounting

export const useMessageQuery = (params: Partial<QueryOptionsType>) => {
  const { data, isLoading, error } = useQuery<UserPaginator, Error>(
    [API_ENDPOINTS.MESSAGE_USER,params],
    () => userClient.fetchMessage(params),
    {
      keepPreviousData: true,
    }
  );

  return {
    users: data?.data ?? [],
    paginatorInfo: mapPaginatorData(data as any),
    loading: isLoading,
    error,
  };
};

// export const useUsersTokenQuery = (params: Partial<QueryOptionsType>) => {
export const useUsersTokenQuery = (params: Partial<QueryOptionsType>) => {
  const { data, isLoading, error } = useQuery<UserPaginator, Error>(
    [API_ENDPOINTS.FACTHED_TOKEN_USER, params],
    () => userClient.fetchUsersPurchasedToken(params),
    {
      keepPreviousData: true,
    }
  );

  return {
    total_users: data?.data ?? [],
    users: data?.data ?? [],
    paginatorInfo: mapPaginatorData(data as any),
    loading: isLoading,
    error,
  };
};


export const useClientTokenQuery = (params: Partial<QueryOptionsType>) => {
  console.log(params,'Params<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>')
  const { data, isLoading, error } = useQuery<UserPaginator, Error>(
    [API_ENDPOINTS.FACTHED_TOKEN_USER, params],
    () => userClient.fetchClientPurchasedToken(params),
    {
      keepPreviousData: true,
    }
  );

  return {
    users: data?.data ?? [],
    paginatorInfo: mapPaginatorData(data as any),
    loading: isLoading,
    error,
  };
};

export const useAdminsQuery = (params: Partial<QueryOptionsType>) => {
  const { data, isLoading, error } = useQuery<UserPaginator, Error>(
    [API_ENDPOINTS.ADMIN_LIST, params],
    () => userClient.fetchAdmins(params),
    {
      keepPreviousData: true,
    }
  );

  return {
    admins: data?.data ?? [],
    paginatorInfo: mapPaginatorData(data as any),
    loading: isLoading,
    error,
  };
};
