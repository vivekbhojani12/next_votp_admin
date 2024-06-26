import { AUTH_CRED } from '@/utils/constants';
import { Routes } from '@/config/routes';
import Cookies from 'js-cookie';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { API_ENDPOINTS } from './client/api-endpoints';
import { tokenClient } from './client/Token';
import { User, QueryOptionsType, UserPaginator, createToken } from '@/types';
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
  const router=useRouter()
  const { t } = useTranslation();

  return useMutation(tokenClient.createToken, {
    onSuccess: () => {
      toast.success(t('common:successfully-created'));
      // router.replace(Routes.dashboard)

    },
    onSettled: () => {
      // queryClient.invalidateQueries(API_ENDPOINTS.USERS);
      queryClient.invalidateQueries(API_ENDPOINTS.FACTHED_TOKEN_USER);
    },
  });
};

// export const useConnectedDevicesMutation = () => {
//   const queryClient = useQueryClient();
//   const { t } = useTranslation();
//   return useMutation(tokenClient.fetchTokenConnectedDevice, {
//     onSuccess: () => {
//       toast.success(t('common:successfully-get'));
//     },
//     // Always refetch after error or success:
//     // onSettled: () => {
//     //   queryClient.invalidateQueries(API_ENDPOINTS.USERS);
//     // },
//     onError: (error: any) => {
//       toast.error(t(`common:${error?.response?.data.message}`));
//     },
//   });
// };

export const useConnectedDevicesMutation = (id:any) => {
  console.log(id ,'the value of id in function of fatch ')
  return useQuery<createToken, Error>(
    [`${API_ENDPOINTS.CONNECTED_TOKEN_VIA_DEVICE}?token=${id}`, id],
    () => tokenClient.fetchTokenConnectedDevice(id)
    ,
    {
      enabled: Boolean(id),
    }
  );
};

export const checkToken=(id:any)=>{
  console.log(id,'the value of token')
  return useQuery<createToken, Error>(
    [`${API_ENDPOINTS.CHECK_TOKEN}?token=${id}`, id],
    () => tokenClient.checkToken(id)
    ,
    {
      enabled: Boolean(id),
    }
  );
}


// export const useConnectedDevicesMutation = ({ id }: { id: string }) => {
//   const fetchTokenConnectedDevice = async () => {
//     try {
//       console.log(id)
//       const response = await tokenClient.fetchTokenConnectedDevice({ id });
//       return response.data; // Adjust this based on the response structure
//     } catch (error) {
//       throw new Error('Failed to fetch token for connected device.');
//     }
//   };

//   return useQuery<createToken, Error>(
//     [`${API_ENDPOINTS.CONNECTED_TOKEN_VIA_DEVICE}?token=${id}`, id],
//     fetchTokenConnectedDevice, // Use the fetchTokenConnectedDevice function
//     {
//       enabled: Boolean(id),
//     }
//   );
// };