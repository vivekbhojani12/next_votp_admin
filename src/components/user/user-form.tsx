import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import PasswordInput from '@/components/ui/password-input';
import { useForm } from 'react-hook-form';
import Card from '@/components/common/card';
import Description from '@/components/ui/description';
import { useRegisterMutation } from '@/data/user';
import { useTranslation } from 'next-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { customerValidationSchema } from './user-validation-schema';
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

const CustomerCreateForm = () => {
  const { t } = useTranslation();
  const { mutate: registerUser, isLoading: loading } = useRegisterMutation();

  const {
    register,
    handleSubmit,
    setError,
    getFieldState,

    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(customerValidationSchema),
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
      // {
      //   onError: (error: any) => {
      //     Object.keys(error?.response?.data).forEach((field: any) => {
      //       setError(field, {
      //         type: 'manual',
      //         message: error?.response?.data[field][0],
      //       });
      //     });
      //   },
      // }
    );
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className=" flex flex-wrap createusers-from">
        {/* <Description
          title={t('form:form-title-information')}
          details={t('form:customer-form-info-help-text')}
          className="sm:pe-4 md:pe-5 w-full px-0 pb-5 sm:w-4/12 sm:py-8 md:w-1/3"
        /> */}

        <Card className="w-full users-from-bg">
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
          {/* <Input
            label={t('form:input-label-mobile')}
            {...register('mobile', {
              required: 'Mobile number is required',
              pattern: {
                value: /^\d+$/, // Use the regex pattern for mobile number validation (only digits allowed)
                message: 'Invalid mobile number',
              },
            })} 
            type="tel" // Set the type to "tel" for mobile number input
            variant="outline"
            className="mb-4"
            error={t(errors.mobile?.message!)}
          /> */}
          <PasswordInput
            label={t('form:input-label-password')}
            {...register('password')}
            error={t(errors.password?.message!)}
            variant="outline"
            className="mb-4"
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

export default CustomerCreateForm;
