import { AUTH_CRED } from '@/utils/constants';
import { Routes } from '@/config/routes';
import Cookies from 'js-cookie';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { API_ENDPOINTS } from './client/api-endpoints';
import { tokenClient } from './client/Token';
import { User, QueryOptionsType, UserPaginator } from '@/types';
import { mapPaginatorData } from '@/utils/data-mappers';
import axios from "axios";
import { setEmailVerified } from "@/utils/auth-utils";


// export const useMeQuery = () => {
//   const queryClient = useQueryClient();
//   const router = useRouter();

//   return useQuery<User, Error>([API_ENDPOINTS.ME], userClient.me, {
//     retry: false,

//     onSuccess: () => {
//       if (router.pathname === Routes.verifyEmail) {
//         setEmailVerified(true);
//         router.replace(Routes.dashboard);
//       }
//     },

//     onError: (err) => {
//       if (axios.isAxiosError(err)) {
//         if (err.response?.status === 409) {
//           setEmailVerified(false);
//           router.replace(Routes.verifyEmail);
//           return;
//         }
//         queryClient.clear();
//         router.replace(Routes.login);
//       }
//     },
//   });
// };

// export function useLogin() {
//   return useMutation(userClient.login);
// }

// export const useLogoutMutation = () => {
//   const router = useRouter();
//   const { t } = useTranslation();

//   return useMutation(userClient.logout, {
//     onSuccess: () => {
//       Cookies.remove(AUTH_CRED);
//       router.replace(Routes.login);
//       toast.success(t('common:successfully-logout'));
//     },
//   });
// };

export const useCreateTokenMutation = () => {
  console.log('process of creating the token.........<<<<<<<<<>>>>>>>>>>>>>>>')
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation(tokenClient.createToken, {
    onSuccess: () => {
      toast.success(t('common:successfully-register'));
    },
    onSettled: () => {
      // queryClient.invalidateQueries(API_ENDPOINTS.USERS);
      queryClient.invalidateQueries(API_ENDPOINTS.REGISTER);
    },
  });
};



