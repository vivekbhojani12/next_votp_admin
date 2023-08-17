import Pagination from '@/components/ui/pagination';
import Image from 'next/image';
import Link from '@/components/ui/link';
import { Table } from '@/components/ui/table';
import ActionButtons from '@/components/common/action-buttons';
import { siteSettings } from '@/settings/site.settings';
import Search from '@/components/common/search';

import {
  Category,
  MappedPaginatorInfo,
  SortOrder,
  User,
  UserPaginator,
} from '@/types';
import { useMeQuery } from '@/data/user';
import { useTranslation } from 'next-i18next';
import { useIsRTL } from '@/utils/locals';
import { useState } from 'react';
import TitleWithSort from '@/components/ui/title-with-sort';
import { useUsersTokenQuery, deleteQuery } from '@/data/user';


type IProps = {
  customers: User[] | undefined;
  paginatorInfo: MappedPaginatorInfo | null;
  onPagination: (current: number) => void;
  onSort: (current: any) => void;
  onOrder: (current: string) => void;
};
const CustomerList = ({
  customers,
  paginatorInfo,
  onPagination,
  onSort,
  onOrder,
}: IProps) => {
  const { t } = useTranslation();
  const { alignLeft } = useIsRTL();

  const [sortingObj, setSortingObj] = useState<{
    sort: SortOrder;
    column: any | null;
  }>({
    sort: SortOrder.Desc,
    column: null,
  });
  console.log(sortingObj, 'sorting object<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>')
  const onHeaderClick = (column: any | null) => ({
    onClick: () => {
      onSort((currentSortDirection: SortOrder) =>
        currentSortDirection === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc
      );

      onOrder(column);

      setSortingObj({
        sort:
          sortingObj.sort === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc,
        column: column,
      });
    },
  });
  const columns = [
    {
      title: t('S.No'),
      dataIndex: 'serialNumber', // Custom dataIndex to hold the serial number
      key: 'serialNumber',
      align: alignLeft,
      width: 74,
      render: (customer: any, customers: any, index = 0) => index + 1, // Render serial number as row index + 1
    },
    {
      title: t('table:table-item-title'),
      dataIndex: 'name',
      key: 'name',
      align: alignLeft,

    },
    {
      title: t('table:table-item-email'),
      dataIndex: 'email',
      key: 'email',
      align: alignLeft,
    }
    // ,
    // {
    //   title: t('table:table-item-permissions'),
    //   dataIndex: 'permissions',
    //   key: 'permissions',
    //   align: 'center',
    //   render: (permissions: any, record: any) => {
    //     return (
    //       <div>
    //         {permissions?.map(({ name }: { name: string }) => name).join(', ')}
    //       </div>
    //     );
    //   },
    // },
    // {
    //   title: t('table:table-item-available_wallet_points'),
    //   dataIndex: ['wallet', 'available_points'],
    //   key: 'available_wallet_points',
    //   align: 'center',
    // },
    ,
    // {
    //   title: (
    //     <TitleWithSort
    //       title={t('table:table-item-status')}
    //       ascending={
    //         sortingObj.sort === SortOrder.Asc &&
    //         sortingObj.column === 1
    //       }
    //       isActive={sortingObj.column === 1}
    //     />
    //   ),
    //   className: 'cursor-pointer',
    //   dataIndex: 'status',
    //   key: 'status',
    //   align: 'center',
    //   onHeaderCell: () => onHeaderClick('status'),
    //   render: (status: boolean) => (status ? 'Active' : 'Inactive'),
    // },

    {
      title: t('table:table-item-edit'),
      dataIndex: 'id',
      key: 'actions',
      align: alignLeft,
      width: 67,
      render: function Render(id: string, { is_active }: any) {
        const { data } = useMeQuery();
        console.log(data, '<<<<<<<>>>>>>>>>>>>>>>>>>>>')
        return (
          <>
            {data && (
              <ActionButtons
                id={id}
                editUrl={`/profile-update`}
              />
            )}
          </>
        );
      },
    },
    {

      title: t('Delete'),
      dataIndex: 'id',
      key: 'delete',
      align: alignLeft,
      width: 85,
      render: function Render(id: string, { is_active }: any) {
        const { data } = useMeQuery();
        console.log(data, '<<<<<<<>>>>>>>>>>>>>>>>>>>>')
        return (
          <>

            {data && (
              <ActionButtons
                id={id}
                deleteModalView={id}

              />

            )}

          </>
        );
      },
    },

  ];


  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');


  function handlePagination(current: any) {
    setPage(current);
  }
  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText);
    setPage(1);
  }


  return (
    <>
      <div className='row'>
        <div className="col-12">
          <h5>Users Details</h5>
        </div>
        <div className="col-12 mb-6 ">
          <div className='users-table'>
            <Table
              // @ts-ignore
              columns={columns}
              emptyText={t('table:empty-table-data')}
              data={customers}
              rowKey="id"
              scroll={{ x: 800 }}

            />
            {!!paginatorInfo?.total && (
              <div className="flex pagination-pt  items-center justify-end">
                <Pagination
                  total={paginatorInfo.total}
                  current={paginatorInfo.startIndex}
                  pageSize={10}
                  onChange={onPagination}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {console.log(paginatorInfo?.pageIndex, 'Paginator,,,,,,,,,,,...........')}


    </>
  );
};

export default CustomerList;
// total={paginatorInfo.total}
// current={paginatorInfo.currentPage}
// pageSize={paginatorInfo.perPage}
// onChange={onPagination}