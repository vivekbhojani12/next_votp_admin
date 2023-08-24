import Button from '@/components/ui/button';
import PasswordInput from '@/components/ui/password-input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from 'next-i18next';

interface Props {
  onSubmit: (values: { password: string }) => void;
  loading: boolean;
}

const schema = yup.object().shape({
  password: yup
    .string()
    .required('form:error-password-required')
    .min(8, 'Password length should be 8 characters long')
    .test('uppercase', 'Password should contain at least one uppercase letter', (value: any) => {
      return /[A-Z]/.test(value);
    })
    .test('specialCharacter', 'Password should contain at least one special character', (value: any) => {
      return /[@$!%*?&]/.test(value);
    })
    .test('number', 'Password should contain at least one Number', (value: any) => {
      return /[0-9]/.test(value);
    })
});

const EnterNewPasswordView = ({ onSubmit, loading }: Props) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ password: string }>({ resolver: yupResolver(schema) });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <PasswordInput
        label={t('form:input-label-password')}
        {...register('password')}
        error={t(errors.password?.message!)}
        variant="outline"
        className="mb-5"
      />

      <Button className="h-11 w-full color-button1 " loading={loading} disabled={loading}>
        {t('form:text-reset-password')}
      </Button>
    </form>
  );
};

export default EnterNewPasswordView;
