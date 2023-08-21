import React from 'react';
import Pagination from '@/components/ui/pagination';
import Search from '@/components/common/search';
import Link from '@/components/ui/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import Layout from '@/components/layouts/admin';
import { adminOnly } from '@/utils/auth-utils';
import { useUsersTokenQuery, deleteQuery, useUsersTokenCount } from '@/data/user';
import { useState, useEffect } from 'react';
import ActionButtons from '../common/action-buttons';
import { HttpClient } from '@/data/client/http-client';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useMutation, useQueryClient } from 'react-query';
import { API_ENDPOINTS } from '@/data/client/api-endpoints';
import { MappedPaginatorInfo } from '@/types';
import { TrashIcon } from '@/components/icons/trash';
import { toast } from 'react-toastify';
import { useTranslation } from 'next-i18next';


type IProps = {
    paginatorInfoo: MappedPaginatorInfo | null;
    onPagination: (current: number) => void;
};

export default function DashboardAdmin() {
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [paramId, setParamId] = useState('');
    const { t } = useTranslation();

    const [orderBy, setOrder] = useState('createdAt');
    const [userId, setUserId] = useState('');
    // const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
    // const deleteProductMutation = useDeleteProductMutation();
    const { users, paginatorInfo, loading, error } = useUsersTokenQuery({
        limit: 10,
        page,
        name: searchTerm,
        orderBy,
        // sortedBy,
    });
    const { user } = useUsersTokenCount()
    const queryClient = useQueryClient();

    const deleteMutation = useMutation(deleteQuery, {
        onSuccess: () => {
            toast.success(t('common:successfully-deleted'));

        },
        onSettled: () => {
            queryClient.invalidateQueries(API_ENDPOINTS.FACTHED_TOKEN_USER);

        }
    });
    function handlePagination(current: any) {
        setPage(current);
    }
    const handleDelete = (id: any) => {


        // Call the deleteMutation function with the ID
        deleteMutation.mutate({ id });
    };
    function handleSearch({ searchText }: { searchText: string }) {
        setSearchTerm(searchText);
        setPage(1);
    }

    const showDeleteConfirmation = (id: any) => {
        confirmAlert({




            title: 'Delete',
            message: 'Are You Sure To Delete?',


            buttons: [
                {
                    label: 'Cancel',
                    onClick: () => console.log('User canceled delete'),

                },
                {
                    label: 'Delete',
                    onClick: () => handleDelete(id)
                    ,
                },
            ],
        });
    };

    return (
        <>
            <div className="main-panel">
                <div className="content">

                    <h4 className="page-title">Dashboard</h4>
                    <div className="row">
                        <div className="col-md-3 col-sm-6 col-lg-3">
                            <div className="card card-stats card-warning">
                                <div className="card-body ">
                                    <div className="row">
                                        <div className="col-4">
                                            <div className="icon-big icon-users text-center">
                                                <i className="icon-font la la-users"></i>
                                            </div>
                                        </div>
                                        <div className="col-8 dashboard-all-p d-flex align-items-center">
                                            <div className="numbers text-all">
                                                <p className="card-category">Total Token</p>
                                                <h4 className="card-title">{user?.total_users}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 col-lg-3">
                            <div className="card card-stats card-success">
                                <div className="card-body ">
                                    <div className="row">
                                        <div className="col-4">
                                            <div className="icon-big icon-users text-center">
                                                <i className="icon-font la la-user"></i>
                                            </div>
                                        </div>
                                        <div className="col-8 dashboard-all-p d-flex align-items-center">
                                            <div className="numbers text-all">
                                                <p className="card-category">Active Token</p>
                                                <h4 className="card-title">{user?.filteredactiveUsers}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 col-lg-3">
                            <div className="card card-stats card-danger">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4">
                                            <div className="icon-big icon-users text-center">
                                                <i className="icon-font la la-user-times"></i>
                                            </div>
                                        </div>
                                        <div className="col-8 dashboard-all-p d-flex align-items-center">
                                            <div className="numbers text-all">
                                                <p className="card-category">Inactive Token</p>
                                                <h4 className="card-title">{user?.filteredInactiveUsers}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 col-lg-3">
                            <div className="card card-stats card-primary">
                                <div className="card-body ">
                                    <div className="row align-items-center">
                                        <div className="col-4">
                                            <div className="icon-big icon-users text-center">
                                                <i className="icon-font la la la-user-plus"></i>
                                            </div>
                                        </div>
                                        <div className="col-8 dashboard-all-p d-flex align-items-center">
                                            <div className="numbers text-all">
                                                <p className="card-category">Upcoming Renews</p>
                                                <h4 className="card-title">{user?.filterUpcomingInactiveUsers}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid user_details">
                    <div className="row">
                        <div className="col-12">
                            <h5>Token Details</h5>
                        </div>
                        <div className="col-12">
                            <div className="card">
                                <div className='search-token-main col-md-3 pt-3.5 ml-auto'>
                                    <Search onSearch={handleSearch} />
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table-bordered table">
                                            <thead>
                                                <tr>
                                                    <th>S.No</th>
                                                    <th>Name</th>
                                                    <th>Email ID</th>
                                                    <th>App Token</th>
                                                    {/* <th>Captcha Token</th> */}
                                                    <th>ID's</th>
                                                    <th>Expiry Date</th>
                                                    <th>Edit</th>
                                                    <th>Delete</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {users.map((user, index) => (
                                                    <tr key={user.id}>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{user?.name}</td>
                                                        <td>{user?.userId?.email || user?.userDetails && user?.userDetails[0].email}</td>
                                                        <td>{user?.token}</td>
                                                        {/* <td>Captcha Token</td> */}
                                                        <td>{user?.no_id}</td>
                                                        <td>
                                                            {user?.exp_date
                                                                ? new Date(user.exp_date).toLocaleDateString()
                                                                : ''}
                                                        </td>
                                                        <td>

                                                            <Link
                                                                href={`orders/checkout`}
                                                                as={`orders/checkout/${user?._id}`}
                                                                className="text-base transition duration-200 hover:text-heading"
                                                            >
                                                                <i className="la la-edit"></i>
                                                            </Link>
                                                        </td>
                                                        <td>
                                                            <a href="#">
                                                                <i
                                                                    className="la la-trash-o"
                                                                    onClick={() =>
                                                                        showDeleteConfirmation(
                                                                            user ? user?._id : ''
                                                                        )
                                                                    }
                                                                ></i>
                                                            </a>
                                                        </td>
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
            </div>

        </>
    );
}

// Dashboard.authenticate = {
//   permissions: adminOnly,
// };

// Dashboard.Layout = Layout;