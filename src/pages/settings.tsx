import AdminLayout from '@/components/layouts/admin';
import { adminOnly } from '@/utils/auth-utils';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Pagination from '@/components/ui/pagination';
import { useUsersTokenQuery, deleteQuery } from '@/data/user';
import { useState, useEffect } from 'react';



export default function Settings() {
  const [page, setPage] = useState(1);
  const { paginatorInfo } = useUsersTokenQuery({
    limit: 10
  });
  function handlePagination(current: any) {
    setPage(current);
  }
  return (
    <>
      <div className="container-fluid user_details">
        <div className="row">
          <div className="col-12">
            <h5>Message Details</h5>
          </div>
          <div className="col-12">
            <div className="card">
              <div className="col-md-3 pt-4 ml-auto">
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Email ID</th>
                        <th>App Token</th>
                        <th>Captcha Token</th>
                        <th>ID's</th>
                        <th>Expiry Date</th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>Username</td>
                        <td>test@test.com</td>
                        <td>G76D87</td>
                        <td>HGT768GD</td>
                        <td>10</td>
                        <td>28-May-2023 (20 days left)</td>
                        <td><a href="#"><i className="la la-edit"></i></a></td>
                        <td><a href="#"><i className="la la-trash-o"></i></a></td>
                      </tr>
                      <tr>
                        <th scope="row">1</th>
                        <td>Username</td>
                        <td>test@test.com</td>
                        <td>G76D87</td>
                        <td>HGT768GD</td>
                        <td>10</td>
                        <td>28-May-2023 (20 days left)</td>
                        <td><a href="#"><i className="la la-edit"></i></a></td>
                        <td><a href="#"><i className="la la-trash-o"></i></a></td>
                      </tr>
                    </tbody>
                  </table>
                  {!!paginatorInfo?.total && (
                    <div className="flex items-center justify-end">
                      <Pagination
                        total={paginatorInfo.total}
                        current={paginatorInfo.startIndex}
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
