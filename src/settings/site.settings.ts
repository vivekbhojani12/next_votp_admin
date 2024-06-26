import { adminAndOwnerOnly, adminOwnerAndStaffOnly } from '@/utils/auth-utils';
import { Routes } from '@/config/routes';

export const siteSettings = {
  name: 'Pixer',
  description: '',
  logo: {
    url: '/logo.svg',
    alt: 'Pixer',
    href: '/',
    width: 128,
    height: 40,
  },
  defaultLanguage: 'en',
  author: {
    name: 'RedQ, Inc.',
    websiteUrl: 'https://redq.io',
    address: '',
  },
  headerLinks: [],
  authorizedLinks: [
    {
      href: Routes.profileUpdate,
      labelTransKey: 'authorized-nav-item-profile',
    },
    {
      href: Routes.logout,
      labelTransKey: 'authorized-nav-item-logout',
    },

  ],
  currencyCode: 'USD',
  sidebarLinks: {
    admin: [
      {
        href: Routes.dashboard,
        label: 'sidebar-nav-item-dashboard',
        icon: 'DashboardIcon',
      },
      {
        href: Routes.user.list,
        label: 'sidebar-nav-item-users',
        icon: 'UsersIcon',
      },

      {
        href: Routes.type.list,
        label: 'sidebar-nav-item-groups',
        icon: 'TaxesIcon',
      },

      {
        href: Routes.settings,
        label: 'sidebar-nav-item-settings',
        icon: 'QuestionIcon',
      },
      // {
      //   href:Routes.scripts,
      //   label: 'Scripts',
      //   icon: 'QuestionIcon',
      // }


    ],

  },
  product: {
    placeholder: '/product-placeholder.svg',
  },
  avatar: {
    placeholder: '/avatar-placeholder.svg',
  },
};
