// import React from 'react';
// import Pagination from '@/components/ui/pagination';
// import Search from '@/components/common/search';
// import Link from '@/components/ui/link';
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// import { GetStaticProps } from 'next';
// import Layout from '@/components/layouts/admin';
// import { adminOnly, ownerAndStaffOnly } from '@/utils/auth-utils';
// import { useUsersTokenQuery, deleteQuery, useMeQuery } from '@/data/user';
// import { useState, useEffect } from 'react';
// import ActionButtons from '../common/action-buttons';
// import { HttpClient } from '@/data/client/http-client';
// import { confirmAlert } from 'react-confirm-alert';
// import 'react-confirm-alert/src/react-confirm-alert.css';
// import { useMutation, useQueryClient } from 'react-query';
// import { API_ENDPOINTS } from '@/data/client/api-endpoints';
// import { MappedPaginatorInfo } from '@/types';

// type IProps = {
//   paginatorInfoo: MappedPaginatorInfo | null;
//   onPagination: (current: number) => void;
// };

// export default function Dashboard({ paginatorInfoo, onPagination }: IProps) {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [page, setPage] = useState(1);
//   const [paramId, setParamId] = useState('');
//   // const { t } = useTranslation();

//   const [orderBy, setOrder] = useState('created_at');
//   const [userId, setUserId] = useState('');
//   // const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
//   // const deleteProductMutation = useDeleteProductMutation();
//   const { users, paginatorInfo, loading, error } = useUsersTokenQuery({
//     limit: 10,
//     page,
//     name: searchTerm,
//     orderBy,
//     // sortedBy,
//   });

//   const queryClient = useQueryClient();

//   const deleteMutation = useMutation(deleteQuery, {
//     onSuccess: () => {
//       // Invalidate the "allToken" query and any other queries you want to update
//       queryClient.invalidateQueries(API_ENDPOINTS.FACTHED_TOKEN_USER);
//     },
//   });

//   function handlePagination(current: any) {
//     console.log(current, 'value of current page');
//     setPage(current);
//   }
//   const handleDelete = (id: any) => {
//     console.log(id, 'Id value');

//     // Call the deleteMutation function with the ID
//     deleteMutation.mutate({ id });
//   };

//   const showDeleteConfirmation = (id: any) => {
//     confirmAlert({
//       title: 'Confirm Delete',
//       message: 'Are you sure you want to delete this user?',
//       buttons: [
//         {
//           label: 'Cancel',
//           onClick: () => console.log('User canceled delete'), // Optional callback
//         },
//         {
//           label: 'Delete',
//           onClick: () => handleDelete(id)
//           ,
//         },
//       ],
//     });
//   };

//   return (
//     <>
//       <div className="main-panel">
//         <div className="content">

//           <h4 className="page-title">Dashboard</h4>
//           <div className="row">
//             <div className="col-md-3">
//               <div className="card card-stats card-warning">
//                 <div className="card-body ">
//                   <div className="row">
//                     <div className="col-5">
//                       <div className="icon-big text-center">
//                         <i className="la la-users"></i>
//                       </div>
//                     </div>
//                     <div className="col-7 d-flex align-items-center">
//                       <div className="numbers">
//                         <p className="card-category">Total Users</p>
//                         <h4 className="card-title">2,294</h4>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-3">
//               <div className="card card-stats card-success">
//                 <div className="card-body ">
//                   <div className="row">
//                     <div className="col-5">
//                       <div className="icon-big text-center">
//                         <i className="la la-user"></i>
//                       </div>
//                     </div>
//                     <div className="col-7 d-flex align-items-center">
//                       <div className="numbers">
//                         <p className="card-category">Active Users</p>
//                         <h4 className="card-title">1,345</h4>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-3">
//               <div className="card card-stats card-danger">
//                 <div className="card-body">
//                   <div className="row">
//                     <div className="col-5">
//                       <div className="icon-big text-center">
//                         <i className="la la-user-times"></i>
//                       </div>
//                     </div>
//                     <div className="col-7 d-flex align-items-center">
//                       <div className="numbers">
//                         <p className="card-category">Inactive Users</p>
//                         <h4 className="card-title">1303</h4>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-3">
//               <div className="card card-stats card-primary">
//                 <div className="card-body ">
//                   <div className="row">
//                     <div className="col-4">
//                       <div className="icon-big text-center">
//                         <i className="la la la-user-plus"></i>
//                       </div>
//                     </div>
//                     <div className="col-8 d-flex align-items-center">
//                       <div className="numbers">
//                         <p className="card-category">Upcoming Renews</p>
//                         <h4 className="card-title">576</h4>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="container-fluid user_details">
//           <div className="row">
//             <div className="col-12">
//               <h5>Users Details</h5>
//             </div>
//             <div className="col-12">
//               <div className="card">
//                 <div className="card-body">
//                   <div className="table-responsive">
//                     <table className="table-bordered table">
//                       <thead>
//                         <tr>
//                           <th>S.No</th>
//                           <th>Name</th>
//                           <th>Email ID</th>
//                           <th>App Token</th>
//                           <th>Captcha Token</th>
//                           <th>ID's</th>
//                           <th>Expiry Date</th>
//                           <th>Edit</th>
//                           <th>Delete</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {users.map((user, index) => (
//                           <tr key={user.id}>
//                             <th scope="row">{index + 1}</th>
//                             <td>{user?.userId?.name}</td>
//                             <td>{user?.userId?.email}</td>
//                             <td>{user?.token}</td>
//                             <td>Captcha Token</td>
//                             <td>{user?.no_id}</td>
//                             <td>
//                               {user?.exp_date
//                                 ? new Date(user.exp_date).toLocaleDateString()
//                                 : ''}
//                             </td>
//                             {/* <td>{user.data1}</td>
//                               <td>{user.data2}</td>
//                               <td>{user.data3}</td>
//                               <td>{`${user.date} (${user.daysLeft} days left)`}</td> */}
//                             <td>
//                               {/* <a href="#">

//                                 </a> */}
//                               <Link
//                                 href={`orders/checkout`}
//                                 as={`orders/checkout/${user?._id}`}
//                                 className="text-base transition duration-200 hover:text-heading"
//                               >
//                                 <i className="la la-edit"></i>
//                               </Link>
//                             </td>
//                             <td>
//                               <a href="#">
//                                 <i
//                                   className="la la-trash-o"
//                                   onClick={() =>
//                                     showDeleteConfirmation(
//                                       user ? user?._id : ''
//                                     )
//                                   }
//                                 ></i>
//                               </a>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                     {!!paginatorInfo?.total && (
//                       <div className="flex items-center justify-end">
//                         <Pagination
//                           total={paginatorInfo.total}
//                           current={paginatorInfo.startIndex}
//                           pageSize={10}
//                           onChange={handlePagination}
//                         />
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//     </>
//   );
// }

import React from 'react';
import Pagination from '@/components/ui/pagination';
import Search from '@/components/common/search';
import Link from '@/components/ui/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import Layout from '@/components/layouts/admin';
import { adminOnly, ownerAndStaffOnly } from '@/utils/auth-utils';
import { useUsersTokenQuery, deleteQuery, useMeQuery } from '@/data/user';
import { useState, useEffect } from 'react';
import ActionButtons from '../common/action-buttons';
import { HttpClient } from '@/data/client/http-client';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useMutation, useQueryClient } from 'react-query';
import { API_ENDPOINTS } from '@/data/client/api-endpoints';
import { MappedPaginatorInfo } from '@/types';
import DashboardAdmin from '@/components/dashboard/adminn';
import Client from '@/components/dashboard/client'
export default function Dashboard() {
  const data = useMeQuery()
  console.log(data?.data?.role_id, 'role_id<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>')
  console.log(data)

  return (
    <div>
      <div>
        {data && data?.data?.data?.role_id === '645a429366dbda4c6eba064f' && <Client data={data} />}
      </div>
      <div>
        {data?.data?.data?.role_id === '645a429366dbda4c6eba064e' && <DashboardAdmin />}
      </div>
    </div>
  );
}