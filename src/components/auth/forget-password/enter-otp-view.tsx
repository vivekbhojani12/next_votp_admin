import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from 'next-i18next';

interface Props {
  onSubmit: (values: { otp: string }) => void;
  loading: boolean;
}

const schema = yup.object().shape({
  otp: yup.string().required('form:error-otp-required'),
});

const EnterOtpView = ({ onSubmit, loading }: Props) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ otp: string }>({ resolver: yupResolver(schema) });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Input
        label={t('otp')}
        {...register('otp')}
        variant="outline"
        className="mb-5"
        error={t(errors.otp?.message!)}
      />
      <Button className="h-11 w-full color-button1" loading={loading} disabled={loading}>
        {t('submit otp')}
      </Button>
    </form>
  );
};

export default EnterOtpView;
