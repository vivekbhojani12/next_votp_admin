// import React from 'react';
// import { useRouter } from 'next/router';
// import { allowedRoles, getAuthCredentials, hasAccess } from './auth-utils';
// import Loader from '@/components/ui/loader/loader';
// import AccessDeniedPage from '@/components/common/access-denied';
// import { Routes } from '@/config/routes';
// import { useMeQuery } from '@/data/user';


// const PrivateRoute: React.FC<{
//   authProps: any;
//   children?: React.ReactNode;
// }> = ({ children, authProps }) => {
//   const router = useRouter();
//   const { token, permissions } = getAuthCredentials();
//   const isUser = !!token;
//   const hasPermission =
//     Array.isArray(permissions) &&
//     !!permissions.length &&
//     hasAccess(authProps.permissions);
//   const roleId = localStorage.getItem('role_id');
//   console.log( 'ROLEID<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>')
//   React.useEffect(() => {
//     if (!isUser) router.replace(Routes.login); // If not authenticated, force log in
//   }, [isUser]);

//   if (isUser && hasPermission) {
//     return <>{children}</>;
//   }
//   if (isUser && !hasPermission) {
//     return <AccessDeniedPage />;
//   }

//   // const item = localStorage.getItem('role_id')
//   // Session is being fetched, or no user.
//   // If no user, useEffect() will redirect.
//   return <Loader showText={false} />;
// };
// export default PrivateRoute;



import React from 'react';
import { useRouter } from 'next/router';
import { allowedRoles, getAuthCredentials, hasAccess } from './auth-utils';
import Loader from '@/components/ui/loader/loader';
import AccessDeniedPage from '@/components/common/access-denied';
import { Routes } from '@/config/routes';
import { useMeQuery } from '@/data/user';
import { ADMIN } from '@/utils/constants'

const PrivateRoute: React.FC<{
  authProps: any;
  children?: React.ReactNode;
}> = ({ children, authProps }) => {
  const router = useRouter();
  const { token, permissions } = getAuthCredentials();
  if (permissions && permissions.includes(ADMIN)) {
    return <AccessDeniedPage />;
  }
  const isUser = !!token;
  const hasPermission =
    Array.isArray(permissions) &&
    !!permissions.length &&
    hasAccess(authProps.permissions);
  // Get 'role_id' from localStorage
  React.useEffect(() => {
    if (!isUser) router.replace(Routes.login); // If not authenticated, force log in
  }, [isUser]);
  if (isUser && hasPermission) {
    return <>{children}</>;
  }
  if (isUser && !hasPermission) {
    return <AccessDeniedPage />;
  }

  return <Loader showText={false} />;
};

// const { token, permissions } = getAuthCredentials();
// console.log(permissions, 'PERMISSIONS')

export default PrivateRoute;