import { useTranslation } from 'next-i18next';
import {
  billingAddressAtom,
  customerAtom,
  shippingAddressAtom,
} from '@/contexts/checkout';
import dynamic from 'next/dynamic';
import { useMeQuery, useTokenUpdateQuery, useUsersTokenQuery } from '@/data/user';
import ErrorMessage from '@/components/ui/error-message';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import Layout from '@/components/layouts/admin';
import { adminOnly } from '@/utils/auth-utils';
import CustomerGrid from '@/components/checkout/customer/customer-grid';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import Loader from '@/components/ui/loader/loader';
import { useMutation, useQueryClient } from 'react-query';
import { API_ENDPOINTS } from '@/data/client/api-endpoints';

// import { useUserQuery } from '@/data/user';
import { AddressType } from '@/types';

const ScheduleGrid = dynamic(
  () => import('@/components/checkout/schedule/schedule-grid')
);
// const AddressGrid = dynamic(() => import('@/components/checkout/address-grid'));
// const ContactGrid = dynamic(
//   () => import('@/components/checkout/contact/contact-grid')
// );
// const RightSideView = dynamic(
//   () => import('@/components/checkout/right-side-view')
// );

export default function CheckoutPage() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const [currentUrl, setCurrentUrl] = useState('');
  const [id, setId] = useState('');

  const { users, paginatorInfo, loading, error } = useUsersTokenQuery({});
  console.log(users, 'Users<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>')
  // const data1 =  useUserQuery({id})
  useEffect(() => {
    // Get the current URL once the component mounts
    setCurrentUrl(window.location.href);
    const parts = currentUrl.split('/');
    setId(parts[5]);
  }, [currentUrl]);
  const {
    data: data1,
    isLoading: loading1,
    error: error1,
  } = useTokenUpdateQuery({ id });
  if (loading1) return <Loader text={t('common:text-loading')} />;
  return (
    <div className="bg-gray-100">
      <div className="lg:space-s-8 m-auto flex w-full max-w-5xl flex-col items-center lg:flex-row lg:items-start">
        <div className="w-full space-y-6 lg:max-w-2xl">
          {/* <CustomerGrid
            className="shadow-700 bg-light p-5 md:p-8"
            //@ts-ignore
            // contact={user?.profile?.contact}
            label={t('text-customer')}
            count={1}
          />
          <ContactGrid
            className="shadow-700 bg-light p-5 md:p-8"
            //@ts-ignore
            contact={user?.profile?.contact}
            label={t('text-contact-number')}
            count={1}
          />

          <AddressGrid
            userId={user?.id!}
            className="shadow-700 bg-light p-5 md:p-8"
            label={t('text-billing-address')}
            count={2}
            //@ts-ignore
            addresses={user?.address?.filter(
              (address) => address?.type === AddressType.Billing
            )}
            atom={billingAddressAtom}
            type={AddressType.Billing}
          />
          <AddressGrid
            userId={user?.id!}
            className="shadow-700 bg-light p-5 md:p-8"
            label={t('text-shipping-address')}
            count={3}
            //@ts-ignore
            addresses={user?.address?.filter(
              (address) => address?.type === AddressType.Shipping
            )}
            atom={shippingAddressAtom}
            type={AddressType.Shipping}
          /> */}
          {/* <ScheduleGrid
            className="shadow-700 bg-light p-5 md:p-8"
            label={t('text-delivery-schedule')}
            count={4}
          /> */}
          <ScheduleGrid />
        </div>
        {/* <div className="mb-10 mt-10 w-full sm:mb-12 lg:mb-0 lg:w-96">
          <RightSideView />
        </div> */}
      </div>
    </div>
  );
}
// CheckoutPage.authenticate = {
//   permissions: adminOnly,
// };
CheckoutPage.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ['table', 'common', 'form'])),
  },
});
