import React from 'react';
import Pagination from '@/components/ui/pagination';
import Search from '@/components/common/search';
import Link from '@/components/ui/link';

import { useUsersTokenQuery, deleteQuery } from '@/data/user';
import { useState } from 'react';
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

export default function Dashboard({ paginatorInfoo, onPagination }: IProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [paramId, setParamId] = useState('');
  // const { t } = useTranslation();

  const [orderBy, setOrder] = useState('created_at');
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
  // /users/:id
  // const handleDelete = (id: any) => {
  //   console.log(id, 'Id value')
  //   const response =  deleteQuery({ id });

  // }
  const queryClient = useQueryClient();

  const deleteMutation = useMutation(deleteQuery, {
    onSuccess: () => {
      // Invalidate the "allToken" query and any other queries you want to update
      queryClient.invalidateQueries(API_ENDPOINTS.FACTHED_TOKEN_USER);
      // queryClient.invalidateQueries(API_ENDPOINTS.USERS);
      // queryClient.invalidateQueries(API_ENDPOINTS.STAFFS);

      // Reload the page after successful deletion
      // window.location.reload();
    },
  });

  function handlePagination(current: any) {
    console.log(current, 'value of current page');
    setPage(current);
  }
  const handleDelete = (id: any) => {
    console.log(id, 'Id value');

    // Call the deleteMutation function with the ID
    deleteMutation.mutate({ id });
  };

  const showDeleteConfirmation = (id: any) => {
    confirmAlert({
      title: 'Confirm Delete',
      message: 'Are you sure you want to delete this user?',
      buttons: [
        {
          label: 'Cancel',
          onClick: () => console.log('User canceled delete'), // Optional callback
        },
        {
          label: 'Delete',
          onClick: () => handleDelete(id),
        },
      ],
    });
  };

  return (
    <>
      <div className="main-panel">
        <div className="content">
          <div className="container-fluid">
            <h4 className="page-title">Dashboard</h4>
            <div className="row">
              <div className="col-md-3">
                <div className="card card-stats card-warning">
                  <div className="card-body ">
                    <div className="row">
                      <div className="col-5">
                        <div className="icon-big text-center">
                          <i className="la la-users"></i>
                        </div>
                      </div>
                      <div className="col-7 d-flex align-items-center">
                        <div className="numbers">
                          <p className="card-category">Total Users</p>
                          <h4 className="card-title">2,294</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card card-stats card-success">
                  <div className="card-body ">
                    <div className="row">
                      <div className="col-5">
                        <div className="icon-big text-center">
                          <i className="la la-user"></i>
                        </div>
                      </div>
                      <div className="col-7 d-flex align-items-center">
                        <div className="numbers">
                          <p className="card-category">Active Users</p>
                          <h4 className="card-title">1,345</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card card-stats card-danger">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-5">
                        <div className="icon-big text-center">
                          <i className="la la-user-times"></i>
                        </div>
                      </div>
                      <div className="col-7 d-flex align-items-center">
                        <div className="numbers">
                          <p className="card-category">Inactive Users</p>
                          <h4 className="card-title">1303</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card card-stats card-primary">
                  <div className="card-body ">
                    <div className="row">
                      <div className="col-5">
                        <div className="icon-big text-center">
                          <i className="la la la-user-plus"></i>
                        </div>
                      </div>
                      <div className="col-7 d-flex align-items-center">
                        <div className="numbers">
                          <p className="card-category">Upcoming Renews</p>
                          <h4 className="card-title">576</h4>
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
                <h5>Users Details</h5>
              </div>
              <div className="col-12">
                <div className="card">
                  {/* <div className="col-md-3 ml-auto pt-4">
                    <form
                      className="navbar-left navbar-form nav-search mr-md-3"
                      action=""
                    >
                      <div className="input-group">
                        <input
                          type="text"
                          placeholder="Search ..."
                          className="form-control"
                        />
                        <div className="input-group-append">
                          <span className="input-group-text">
                            <i className="la la-search search-icon"></i>
                          </span>
                        </div>
                      </div>
                    </form>
                    
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
                            <th>Edit</th>
                            <th>Delete</th>
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
                              <td>
                                {/* <a href="#">
                                  
                                </a> */}
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
                          {/* <tr>
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
                          </tr> */}
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
