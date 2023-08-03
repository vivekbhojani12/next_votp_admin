import Layout from '@/components/layouts/admin';
import ProfileUpdateFrom from '@/components/auth/profile-update-form';
import ChangePasswordForm from '@/components/auth/change-password-from';
import ErrorMessage from '@/components/ui/error-message';
import Loader from '@/components/ui/loader/loader';
import { useMeQuery, useUserUpdateQuery } from '@/data/user';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Button from '@/components/ui/button';
import EmailUpdateForm from '@/components/auth/email-update-form';
import { useEffect, useState } from 'react';
import { Link } from 'react-scroll';

export default function ProfilePage() {
  const { t } = useTranslation();
  const { data, isLoading: loading, error } = useMeQuery();
  if (loading) return <Loader text={t('common:text-loading')} />;
  if (error) return <ErrorMessage message={error.message} />;
  const [currentUrl, setCurrentUrl] = useState('');
  const [id, setId] = useState('');
  // const data1 =  useUserQuery({id})
  useEffect(() => {
    // Get the current URL once the component mounts
    setCurrentUrl(window.location.href);
    const parts = currentUrl.split('/');
    setId(parts[4]);
  }, [currentUrl]);
  const {
    data: data1,
    isLoading: loading1,
    error: error1,
  } = useUserUpdateQuery({ id });
  if (loading1) return <Loader text={t('common:text-loading')} />;
  console.log(data1, 'value of data1');
  console.log(data, 'value of data');


  return (
    <>
    <div className='profile-main'>
      <div className="row flex border-b border-dashed border-border-base py-5 sm:py-8">
        <h1 className="col-md-3 text-lg font-semibold text-heading">
          {t('form:form-title-profile-settings')}
        </h1>
      </div>

      {data && data1 && id && <div>
        <ProfileUpdateFrom me={data1} />
        <ChangePasswordForm me={data1} />
      </div>}
      {data && id === undefined && <div>
        <ProfileUpdateFrom me={data} />
        <ChangePasswordForm me={data} />
      </div>}
      </div>
    </>
  );
}
ProfilePage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common'])),
  },
});
