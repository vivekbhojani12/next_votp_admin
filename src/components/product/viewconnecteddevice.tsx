import React, { useEffect } from 'react';
import { useModalAction, useModalState } from '@/components/ui/modal/modal.context';
import { useConnectedDevicesMutation } from '@/data/token';
import { getErrorMessage } from '@/utils/form-error';
import { Table } from '@/components/ui/table';
import ConfirmationCard from '../common/confirmation-card';
import Loader from '@/components/ui/loader/loader';
import { useTranslation } from 'next-i18next';
import { useIsRTL } from '@/utils/locals';


const ProductDeleteView = () => {

    const { alignLeft } = useIsRTL();
    const { t } = useTranslation();
    const { data } = useModalState();
    const { closeModal } = useModalAction();

    useEffect(() => {
        if (data) {
            fetchConnectedDevices(data);
        }
    }, [data]);

    const fetchConnectedDevices = (token: any) => {
        try {
            console.log(token, 'Token<<<<>>>>>>>>>>>>>>>>>>');
            // Call the useConnectedDevicesMutation hook as needed in its implementation
            useConnectedDevicesMutation(token);
        } catch (error) {
            getErrorMessage(error);
        }
    };

    // Assuming you want to handle the loading state
    const { data: data1, isLoading: loading1, error: error1 } = useConnectedDevicesMutation(data);
    const newData = data1 && data1.data
    console.log(newData, 'the value of new data')
    if (loading1) return <Loader text={t('common:text-loading')} />;

    console.log(data1, 'the value of data 2');
    return (
        <div className='view-table-main'>
            {data1 && newData.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>SIM 1</th>
                            <th>SIM 2</th>
                            {/* Add more headers based on your data structure */}
                        </tr>
                    </thead>
                    <tbody>
                        {newData.map((item: any) => (
                            <tr key={item.id}>
                                <td>{item.sim_1}</td>
                                <td>{item.sim_2}</td>
                                {/* Add more cells based on your data structure */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No data available</p>
            )}
        </div>
    );
};

export default ProductDeleteView;