import AdminLayout from '@/components/layouts/admin';
import Search from '@/components/common/search';
import { adminOnly } from '@/utils/auth-utils';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Pagination from '@/components/ui/pagination';
import { useUsersTokenQuery, deleteQuery, useMessageQuery } from '@/data/user';
import { useState, useEffect } from 'react';
import { MappedPaginatorInfo } from '@/types';


type IProps = {
  paginatorInfoo: MappedPaginatorInfo | null;
  onPagination: (current: number) => void;
};


export default function Settings() {
  const [searchTerm, setSearchTerm] = useState('');
  const [orderBy, setOrder] = useState('createdAt');

  const [page, setPage] = useState(1);

  const { users, paginatorInfo } = useMessageQuery({
    limit: 10,
    page,
    name: searchTerm,
    orderBy,
    // sortedBy,
  });


  function handlePagination(current: any) {
    setPage(current);
  }
  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText);
    setPage(1);
  }

  console.log(paginatorInfo, 'the value of paginatorInfo in message')
  return (
    <>
      <div className="container-fluid user_details">
        <div className="row">
          <div className="col-12">
            <h5>Message Details</h5>
          </div>
          <div className="col-12">
            <div className="card">
              <div className='search-token-main col-md-3 pt-3.5 ml-auto'>
                <Search onSearch={handleSearch} />
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Mobile No</th>
                        <th>Message</th>
                        <th>Otp</th>
                        <th>Vehicle No</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => (
                        <tr key={user._id}>
                          <th scope="row">{paginatorInfo && paginatorInfo.startIndex + index}</th>
                          <td>{user?.mobile_num}</td>
                          <td>{user?.message}</td>
                          <td>{user?.otp}</td>
                          <td>{user?.vehicle_num}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {!!paginatorInfo?.total && (
                    <div className="flex items-center justify-end">
                      <Pagination
                        total={paginatorInfo.total}
                        current={paginatorInfo.pageIndex}
                        pageSize={10}
                        onChange={handlePagination}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
Settings.authenticate = {
  permissions: adminOnly,
};
Settings.Layout = AdminLayout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common'])),
  },
});