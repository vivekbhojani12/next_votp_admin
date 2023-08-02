import { useTranslation } from 'next-i18next';
import {
  billingAddressAtom,
  customerAtom,
  shippingAddressAtom,
} from '@/contexts/checkout';
import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import Layout from '@/components/layouts/admin';
import { adminOnly } from '@/utils/auth-utils';
import CustomerGrid from '@/components/checkout/customer/customer-grid';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import Loader from '@/components/ui/loader/loader';
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
  console.log('this <<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
  const [customer] = useAtom(customerAtom);
  const { t } = useTranslation();

  // const {
  //   data: user,
  //   isLoading: loading,
  //   refetch,
  // } = useUserQuery({ id: customer?.value });
  // useEffect(() => {
  //   if (customer?.value) {
  //     refetch(customer?.value);
  //   }
  // }, [customer?.value]);

  // if (loading) return <Loader text={t('common:text-loading')} />;

  return (
    <div className="bg-gray-100">
      <div className="lg:space-s-8 m-auto  w-full max-w-5xl flex-col items-center lg:flex-row lg:items-start">
        <div className="w-full">
          <ScheduleGrid />
        </div>
        <div className="mb-10 mt-10 w-full sm:mb-12 lg:mb-0 lg:w-96">
          {/* <RightSideView /> */}
        </div>
      </div>
    </div>
  );
}
CheckoutPage.authenticate = {
  permissions: adminOnly,
};
CheckoutPage.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ['table', 'common', 'form'])),
  },
});
