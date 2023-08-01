import { useForm } from 'react-hook-form';
import Button from '@/components/ui/button';
import Card from '@/components/common/card';
import Description from '@/components/ui/description';
import { toast } from 'react-toastify';
import PasswordInput from '@/components/ui/password-input';
import { useChangePasswordMutation } from '@/data/user';
import { useTranslation } from 'next-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface FormValues {
  _id: string
  old_password: string;
  password: string;
  passwordConfirmation: string;
}

const changePasswordSchema = yup.object().shape({
  old_password: yup.string().required('form:error-old-password-required'),
  password: yup
  .string()
  .required('form:error-password-required')
  .min(8, 'Password length should be 8 character long length') // At least 8 characters long
  .matches(
    /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    'Invalid Password'
  ), // Contains at least one uppercase letter and one special character
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'form:error-match-passwords')
    .required('form:error-confirm-password'),
});

const ChangePasswordForm = ({ me }: any) => {
  const { t } = useTranslation();
  const { mutate: changePassword, isLoading: loading } =
    useChangePasswordMutation();
  const {
    register,
    handleSubmit,
    setError,
    reset,

    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(changePasswordSchema),
  });

  async function onSubmit(values: FormValues) {
    changePassword(
      {
        _id: me?.data?._id,
        old_password: values.old_password,
        password: values.password,
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
        onSuccess: (data) => {
          if (!data?.flag === true) {
            setError('old_password', {
              type: 'manual',
              message: data?.message ?? '',
            });
          } else if (data?.flag === true) {
            toast.success(t('common:password-changed-successfully'));
            reset();
          }
        },
      }
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="my-5 flex flex-wrap sm:my-8">


        <Card className="mb-5 w-full ">
          <PasswordInput
            label={t('form:input-label-old-password')}
            {...register('old_password')}
            variant="outline"
            error={t(errors.old_password?.message!)}
            className="mb-5"
          />
          <PasswordInput
            label={t('form:input-label-new-password')}
            {...register('password')}
            variant="outline"
            error={t(errors.password?.message!)}
            className="mb-5"
          />
          <PasswordInput
            label={t('form:input-label-confirm-password')}
            {...register('passwordConfirmation')}
            variant="outline"
            error={t(errors.passwordConfirmation?.message!)}
          />
          <div className="text-end w-full">
            <Button className='color-button-profile' loading={loading} disabled={loading}>
              {t('form:button-label-change-password')}
            </Button>
          </div>
        </Card>


      </div>
    </form>
  );
};
export default ChangePasswordForm;
