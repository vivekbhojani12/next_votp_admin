import React, { useEffect } from 'react';
import { useModalAction, useModalState } from '@/components/ui/modal/modal.context';
import { useConnectedDevicesMutation } from '@/data/token';
import { getErrorMessage } from '@/utils/form-error';
import { Table } from '@/components/ui/table';
import ConfirmationCard from '../common/confirmation-card';
import Loader from '@/components/ui/loader/loader';
import { useTranslation } from 'next-i18next';
import { useIsRTL } from '@/utils/locals';
import { CloseIcon } from '@/components/icons/close-icon';


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
            <div className='view-table-bodar'>
                <div className='view-Close-btn'>
                    <CloseIcon width={18} className='view-button-colo' onClick={closeModal} />
                </div>
                {data1 && newData.length > 0 ? (
                    <table className="table-bordered table">
                        <thead>
                            <tr>
                                <th>S.r. No</th>
                                <th>Connected Mobile</th>
                                {/* <th>SIM 2</th> */}
                                {/* Add more headers based on your data structure */}
                            </tr>
                        </thead>
                        <tbody>
                            {newData.map((item: any, index: any) => (
                                <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.sim_1 ? item.sim_1 : item.sim_2}</td>
                                    {/* <td>{item.sim_2}</td> */}
                                    {/* Add more cells based on your data structure */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No data available</p>
                )}
            </div>
        </div>

    );
};

export default ProductDeleteView;