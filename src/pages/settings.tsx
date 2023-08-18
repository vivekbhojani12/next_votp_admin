import AdminLayout from '@/components/layouts/admin';
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
  const [page, setPage] = useState(1);
  const [paramId, setParamId] = useState('');
  // const { t } = useTranslation();

  const [orderBy, setOrder] = useState('createdAt');
  const [userId, setUserId] = useState('');
  const { users, paginatorInfo, loading, error } = useMessageQuery({
    limit: 10,
    page,
    name: searchTerm,
    orderBy,
    // sortedBy,
  });
  function handlePagination(current: any) {
    setPage(current);
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
                          <th scope="row">{index + 1}</th>
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



// vehicle_num