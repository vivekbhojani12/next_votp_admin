export const Routes = {
  dashboard: '/',
  // createtoken: '/',
  login: '/login',
  logout: '/logout',
  register: '/register',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  adminMyShops: '/my-shops',
  profile: '/profile',
  verifyCoupons: '/coupons/verify',
  settings: '/settings',
  storeSettings: '/vendor/settings',
  storeKeepers: '/vendor/store_keepers',
  profileUpdate: '/profile-update',
  checkout: '/orders/checkout',
  verifyEmail: '/verify-email',
  user: {
    ...routesFactory('/users'),
  },
  type: {
    ...routesFactory('/'),
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
  withdraw: {
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

// user: {
//   ...routesFactory('/users'),
// },
// type: {
//   ...routesFactory('/groups'),
// },
// category: {
//   ...routesFactory('/categories'),
// },
// attribute: {
//   ...routesFactory('/attributes'),
// },
// attributeValue: {
//   ...routesFactory('/attribute-values'),
// },
// tag: {
//   ...routesFactory('/tags'),
// },
// reviews: {
//   ...routesFactory('/reviews'),
// },
// abuseReviews: {
//   ...routesFactory('/abusive_reports'),
// },
// abuseReviewsReport: {
//   ...routesFactory('/abusive_reports/reject'),
// },
// author: {
//   ...routesFactory('/authors'),
// },
// coupon: {
//   ...routesFactory('/coupons'),
// },
// manufacturer: {
//   ...routesFactory('/manufacturers'),
// },
// order: {
//   ...routesFactory('/orders'),
// },
// orderStatus: {
//   ...routesFactory('/order-status'),
// },
// orderCreate: {
//   ...routesFactory('/orders/create'),
// },
// product: {
//   ...routesFactory('/products'),
// },
// shop: {
//   ...routesFactory('/shops'),
// },
// tax: {
//   ...routesFactory('/taxes'),
// },
// shipping: {
//   ...routesFactory('/shippings'),
// },
// withdraw: {
//   ...routesFactory('/withdraws'),
// },
// staff: {
//   ...routesFactory('/staffs'),
// },
// refund: {
//   ...routesFactory('/refunds'),
// },
// question: {
//   ...routesFactory('/questions'),
// },

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
