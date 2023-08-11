import React from 'react';
import Pagination from '@/components/ui/pagination';
import Search from '@/components/common/search';
import Link from '@/components/ui/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import Layout from '@/components/layouts/admin';
import { adminOnly, ownerAndStaffOnly } from '@/utils/auth-utils';
import { useUsersTokenQuery, deleteQuery, useClientTokenQuery } from '@/data/user';
import { useState, useEffect } from 'react';
import ActionButtons from '../common/action-buttons';
import { HttpClient } from '@/data/client/http-client';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useMutation, useQueryClient } from 'react-query';
import { API_ENDPOINTS } from '@/data/client/api-endpoints';
import { MappedPaginatorInfo } from '@/types';

type IProps = {
    paginatorInfoo: MappedPaginatorInfo | null;
    onPagination: (current: number) => void;
};


export default function Client(data: any) {
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [paramId, setParamId] = useState('');
    // const { t } = useTranslation();
    console.log(data?.data?.data?.data?.id, 'Id<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>')
    const [orderBy, setOrder] = useState('createdAt');
    // const [userId, setUserId] = useState('');
    // const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
    // const deleteProductMutation = useDeleteProductMutation();
    const { users, paginatorInfo, loading, error } = useClientTokenQuery({
        limit: 10,
        page,
        name: searchTerm,
        orderBy,
        userId: data?.data?.data?.data?.id
        // sortedBy,
    });
    console.log(users, '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<USERS>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')

    function handlePagination(current: any) {
        console.log(current, 'value of current page');
        setPage(current);
    }
    function handleSearch({ searchText }: { searchText: string }) {
        setSearchTerm(searchText);
        setPage(1);
    }

    return (
        <>
            <div className="main-panel">
                <div className="content">
                    <div className="container-fluid user_details">
                        <div className="row">
                            <div className="col-12">
                                <h5>Users Details</h5>
                            </div>
                            <div className="col-12">
                                <div className="card">
                                    {/* <div className='search-token-main col-md-3 pt-3.5 ml-auto'>
                                        <Search onSearch={handleSearch} />
                                    </div> */}
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table className="table-bordered table">
                                                <thead>
                                                    <tr>
                                                        <th>S.No</th>
                                                        <th>Name</th>
                                                        <th>Email ID</th>
                                                        <th>App Token</th>
                                                        <th>Captcha Token</th>
                                                        <th>ID's</th>
                                                        <th>Expiry Date</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {users.map((user, index) => (
                                                        <tr key={user.id}>
                                                            <th scope="row">{index + 1}</th>
                                                            <td>{user?.userId?.name}</td>
                                                            <td>{user?.userId?.email}</td>
                                                            <td>{user?.token}</td>
                                                            <td>Captcha Token</td>
                                                            <td>{user?.no_id}</td>
                                                            <td>
                                                                {user?.exp_date
                                                                    ? new Date(user.exp_date).toLocaleDateString()
                                                                    : ''}
                                                            </td>
                                                            {/* <td>{user.data1}</td>
                              <td>{user.data2}</td>
                              <td>{user.data3}</td>
                              <td>{`${user.date} (${user.daysLeft} days left)`}</td> */}
                                                        </tr>
                                                    ))}
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
                </div>
            </div>
        </>
    );
}


// Client.authenticate = {
//     permissions: ownerAndStaffOnly,
// };