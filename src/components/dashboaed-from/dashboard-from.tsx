

import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import PasswordInput from '@/components/ui/password-input';
import { useForm } from 'react-hook-form';
import Card from '@/components/common/card';
import Description from '@/components/ui/description';
import { useRegisterMutation } from '@/data/user';
import { useTranslation } from 'next-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
// import { customerValidationSchema } from './user-validation-schema';
import { Permission } from '@/types';

type FormValues = {
    name: string;
    email: string;
    password: string;
    // mobile: Number
    // permission: Permission;
};

const defaultValues = {
    email: '',
    password: '',
};

const dashboardfrom = () => {
    const { t } = useTranslation();
    const { mutate: registerUser, isLoading: loading } = useRegisterMutation();

    const {
        register,
        handleSubmit,
        setError,

        formState: { errors },
    } = useForm<FormValues>({
        defaultValues,

    });

    async function onSubmit({ name, email, password }: FormValues) {
        registerUser(
            {
                name,
                // mobile,
                email,
                password,
                // permission: Permission.StoreOwner,
            },
            {
                onError: (error: any) => {
                    Object.keys(error?.response?.data).forEach((field: any) => {
                        setError(field, {
                            type: 'manual',
                            message: error?.response?.data[field][0],
                        });
                    });
                },
            }
        );
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="my-5 flex flex-wrap sm:my-8">


                <Card className="w-full ">
                    <Input
                        label={t('form:input-label-name')}
                        {...register('name')}
                        type="text"
                        variant="outline"
                        className="mb-4"
                        error={t(errors.name?.message!)}
                    />

                    <Input
                        label={t('form:input-label-email')}
                        {...register('email')}
                        type="email"
                        variant="outline"
                        className="mb-4"
                        error={t(errors.email?.message!)}
                    />
                    <Input
                        label={t('form:input-label-apptoken')}
                        {...register('email')}
                        type="apptoken"
                        variant="outline"
                        className="mb-4"
                        error={t(errors.email?.message!)}
                    />
                    <Input
                        label={t('form:input-label-captchatoken')}
                        {...register('email')}
                        type="captchatoken"
                        variant="outline"
                        className="mb-4"
                        error={t(errors.email?.message!)}
                    />
                    <Input
                        label={t('form:input-label-id')}
                        {...register('email')}
                        type="id"
                        variant="outline"
                        className="mb-4"
                        error={t(errors.email?.message!)}
                    />
                    <Input
                        label={t('form:input-label-expirydate')}
                        {...register('email')}
                        type="expirydate"
                        variant="outline"
                        className="mb-4"
                        error={t(errors.email?.message!)}
                    />

                </Card>
            </div>

            <div className="text-end mb-4">
                <Button className='color-button-users' loading={loading} disabled={loading}>
                    {t('form:button-label-create-customer')}
                </Button>
            </div>
        </form>
    );
};

export default dashboardfrom;


