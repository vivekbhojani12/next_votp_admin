import Pagination from '@/components/ui/pagination';
import Image from 'next/image';
import { Table } from '@/components/ui/table';
import ActionButtons from '@/components/common/action-buttons';
import { siteSettings } from '@/settings/site.settings';
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

type IProps = {
    customers: User[] | undefined;
    paginatorInfo: MappedPaginatorInfo | null;
    onPagination: (current: number) => void;
    onSort: (current: any) => void;
    onOrder: (current: string) => void;
};
const DashboaedList = ({
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
        },
        {
            title: t('table:table-item-actions'),
            dataIndex: 'id',
            key: 'actions',
            align: 'right',
            render: function Render(id: string, { is_active }: any) {
                const { data } = useMeQuery();
                console.log(data, '<<<<<<<>>>>>>>>>>>>>>>>>>>>')
                return (
                    <>
                        {data && (
                            <ActionButtons
                                id={id}
                                deleteModalView={id}
                                editUrl={`/dashboardfrom`}

                            />
                        )}
                    </>
                );
            },
        },
    ];

    return (
        <>
            <div className="mb-6 overflow-hidden rounded shadow">
                <Table
                    // @ts-ignore
                    columns={columns}
                    emptyText={t('table:empty-table-data')}
                    data={customers}
                    rowKey="id"
                    scroll={{ x: 800 }}
                />
            </div>
            {console.log(paginatorInfo, 'Paginator,,,,,,,,,,,...........')}
            {!!paginatorInfo?.total && (
                <div className="flex items-center justify-end">
                    <Pagination
                        total={paginatorInfo.total}
                        current={paginatorInfo.pageIndex}
                        pageSize={10}
                        onChange={onPagination}
                    />
                </div>
            )}
        </>
    );
};

export default DashboaedList;
