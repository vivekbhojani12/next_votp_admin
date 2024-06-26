import Card from '@/components/common/card';
import Layout from '@/components/layouts/admin';
import Search from '@/components/common/search';
import CustomerList from '@/components/user/user-list';
import LinkButton from '@/components/ui/link-button';
import { useState } from 'react';
import ErrorMessage from '@/components/ui/error-message';
import Loader from '@/components/ui/loader/loader';
import { useUsersQuery } from '@/data/user';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Routes } from '@/config/routes';
import { SortOrder } from '@/types';
import { adminOnly, ownerOnly } from '@/utils/auth-utils';
import { canAccess } from '@/utils/auth-utils';
import Cookies from 'js-cookie';
import { AUTH_CRED } from '@/utils/constants';

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const { t } = useTranslation();

  const [orderBy, setOrder] = useState('created_at');
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);

  const { users, paginatorInfo, loading, error } = useUsersQuery({
    limit: 10,
    page,
    name: searchTerm,
    orderBy,
    sortedBy,
  });
  console.log(paginatorInfo, 'paginatr info<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>')

  if (loading) return <Loader text={t('common:text-loading')} />;
  if (error) return <ErrorMessage message={error.message} />;

  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText);
    setPage(1);
  }

  function handlePagination(current: any) {
    console.log(current, 'value of current page')
    setPage(current);
  }

  return (
    <>
      <div className="mb-4 md:mb-0 md:w-1/4">
        <h1 className="text-lg users-label font-semibold text-heading">
          {t('form:input-label-customers')}
        </h1>
      </div>
      <div className='users-main'>
        <Card className="mb-8 users-card-color flex flex-col items-center md:flex-row">
          <div className=" flex users-search-btn w-full justify-between items-center ">
            <Search onSearch={handleSearch} className='w-3/5' />
            <LinkButton
              href={`${Routes.user.create}`}
              className="ms-4 md:ms-6 h-12 color-user-add"
            >
              <span>+ {t('form:button-label-add-customer')}</span>
            </LinkButton>
          </div>
        </Card>

        {loading ? null : (
          <CustomerList
            customers={users}
            paginatorInfo={paginatorInfo}
            onPagination={handlePagination}
            onOrder={setOrder}
            onSort={setColumn}
          />
        )}
      </div>
    </>
  );
}

Customers.authenticate = {
  permissions: adminOnly,
};

Customers.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['table', 'common', 'form'])),
  },
});
