
export const Routes = {
  dashboard: '/',
  login: '/login',
  logout: '/logout',
  scripts:'/scripts',
  // register: '/register',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  adminMyShops: '/my-shops',
  profile: '/profile',
  verifyCoupons: '/coupons/verify',
  settings: '/settings',
  storeSettings: '/vendor/settings',
  storeKeepers: '/vendor/store_keepers',
  profileUpdate: '/profile-update',
  // editdeshboard: '/deshboardform',
  checkout: '/orders/checkout',
  verifyEmail: '/verify-email',
  user: {
    ...routesFactory('/users'),
  },
  type: {
    ...routesFactory('/groups'),
  },
  category: {
    ...routesFactory('/'),
  },
  attribute: {
    ...routesFactory('/'),
  },
  attributeValue: {
    ...routesFactory('/'),
  },
  tag: {
    ...routesFactory('/'),
  },
  reviews: {
    ...routesFactory('/'),
  },
  abuseReviews: {
    ...routesFactory('/'),
  },
  abuseReviewsReport: {
    ...routesFactory('/'),
  },
  author: {
    ...routesFactory('/'),
  },
  coupon: {
    ...routesFactory('/'),
  },
  manufacturer: {
    ...routesFactory('/'),
  },
  order: {
    ...routesFactory('/'),
  },
  orderStatus: {
    ...routesFactory('/'),
  },
  orderCreate: {
    ...routesFactory('/'),
  },
  product: {
    ...routesFactory('/'),
  },
  shop: {
    ...routesFactory('/'),
  },
  tax: {
    ...routesFactory('/'),
  },
  shipping: {
    ...routesFactory('/'),
  },

  staff: {
    ...routesFactory('/'),
  },
  refund: {
    ...routesFactory('/'),
  },
  question: {
    ...routesFactory('/'),
  },
};


function routesFactory(endpoint: string) {
  return {
    list: `${endpoint}`,
    create: `${endpoint}/create`,
    editWithoutLang: (slug: string, shop?: string) => {
      return shop
        ? `/${shop}${endpoint}/${slug}/edit`
        : `${endpoint}/${slug}/edit`;
    },
    edit: (slug: string, language: string, shop?: string) => {
      return shop
        ? `/${language}/${shop}${endpoint}/${slug}/edit`
        : `${language}${endpoint}/${slug}/edit`;
    },
    translate: (slug: string, language: string, shop?: string) => {
      return shop
        ? `/${language}/${shop}${endpoint}/${slug}/translate`
        : `${language}${endpoint}/${slug}/translate`;
    },
    details: (slug: string) => `${endpoint}/${slug}`,
  };
}
