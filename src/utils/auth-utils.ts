import Cookie from 'js-cookie';
import { useLocalStorage } from 'react-use';
import SSRCookie from 'cookie';
import {
  AUTH_CRED, EMAIL_VERIFIED,
  PERMISSIONS,
  STAFF,
  STORE_OWNER,
  SUPER_ADMIN,
  TOKEN,
  AUTH_ROLE,
  ADMIN,
} from './constants';

export const allowedRoles = [SUPER_ADMIN,STORE_OWNER, STAFF,ADMIN];
export const allowedRolestoAdmin = [SUPER_ADMIN,STORE_OWNER, STAFF];

export const adminAndOwnerOnly = [SUPER_ADMIN, STORE_OWNER];
export const adminOwnerAndStaffOnly = [SUPER_ADMIN, STORE_OWNER, STAFF];
export const adminOnly = [SUPER_ADMIN];
export const ownerOnly = [STORE_OWNER];
export const ownerAndStaffOnly = [STORE_OWNER, STAFF];

// const permissions =allowedRoles
// const customer=ownerAndStaffOnly

export function setAuthCredentials(token: string, permissions:any) {
  Cookie.set(AUTH_CRED, JSON.stringify({ token, permissions }));
}
// export function setCustomerCredentials(token: string) {
//   Cookie.set(AUTH_CRED, JSON.stringify({ token, customer }));
// }
export function setAuthRole(id: string) {
  localStorage.setItem(AUTH_ROLE, JSON.stringify({ id}));
}
export function setEmailVerified(emailVerified: boolean) {
  Cookie.set(EMAIL_VERIFIED, JSON.stringify({ emailVerified }));
}
export function getEmailVerified(): {
  emailVerified: boolean;
} {
  const emailVerified = Cookie.get(EMAIL_VERIFIED);
  return emailVerified ? JSON.parse(emailVerified) : false;
}

// export function getAuthCredentials(context?: any): {
//   token: string | null;
  
//   // permissions: string[] | null;
// } {
//   let authCred;
//   if (context) {
//     authCred = parseSSRCookie(context)[AUTH_CRED];
//   } else {
//     authCred = Cookie.get(AUTH_CRED);
//   }
//   if (authCred) {
//     return JSON.parse(authCred);
//   }
//   return { token: null };
// }


export function getAuthCredentials(context?: any): {
  token: string | null;
  permissions: string[] | null;
} {
  let authCred;
  if (context) {
    authCred = parseSSRCookie(context)[AUTH_CRED];
  } else {
    authCred = Cookie.get(AUTH_CRED);
  }
  if (authCred) {
    return JSON.parse(authCred);
  }
  return { token: null, permissions: null };
}

export function parseSSRCookie(context: any) {
  return SSRCookie.parse(context.req.headers.cookie ?? '');
}

export function hasAccess(
  token: string| undefined | null,
  // _userPermissions: string[] | undefined | null
) {
  if (token) {
    return  true
  }
  return false;
}

// export function hasAccess(
//   _allowedRoles: string[],
//   _userPermissions: string[] | undefined | null
// ) {
//   if (_userPermissions) {
//     return Boolean(
//       _allowedRoles?.find((aRole) => _userPermissions.includes(aRole))
//     );
//   }
//   return false;
// }


export function isAuthenticated(_cookies: any) {
  return (
    !!_cookies[TOKEN]
    //  &&
    //  useLocalStorage(AUTH_ROLE)
  );
}


export function canAccess(id:string){
  if (id) {
    return  true
  }
  return false;
}
