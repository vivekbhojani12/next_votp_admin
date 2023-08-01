// import { RadioGroup } from '@headlessui/react';
// import { useAtom } from 'jotai';
// import ScheduleCard from './schedule-card';
// import { deliveryTimeAtom } from '@/contexts/checkout';
// import { useEffect } from 'react';
// import { useTranslation } from 'next-i18next';
// import { useSettings } from '@/contexts/settings.context';

// interface ScheduleProps {
// 	label: string;
// 	className?: string;
// 	count?: number;
// }

// export const ScheduleGrid: React.FC<ScheduleProps> = ({
// 	label,
// 	className,
// 	count,
// }) => {
//   const { t } = useTranslation('common');
//   const { deliveryTime: schedules } = useSettings();

//   const [selectedSchedule, setSchedule] = useAtom(deliveryTimeAtom);
//   useEffect(() => {
//     setSchedule(schedules[0]);
//   }, []);
//   return (
//     <div className={className}>
//       <div className="mb-5 flex items-center justify-between md:mb-8">
//         <div className="space-s-3 md:space-s-4 flex items-center">
//           {count && (
//             <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-base text-light lg:text-xl">
//               {count}
//             </span>
//           )}
//           <p className="text-lg capitalize text-heading lg:text-xl">{label}</p>
//         </div>
//       </div>

//       {schedules && schedules?.length ? (
//         <RadioGroup value={selectedSchedule} onChange={setSchedule}>
//           <RadioGroup.Label className="sr-only">{label}</RadioGroup.Label>
//           <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
//             {schedules?.map((schedule: any, idx: number) => (
//               <RadioGroup.Option value={schedule} key={idx}>
//                 {({ checked }) => (
//                   <ScheduleCard checked={checked} schedule={schedule} />
//                 )}
//               </RadioGroup.Option>
//             ))}
//           </div>
//         </RadioGroup>
//       ) : (
//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
//           <span className="relative rounded border border-border-200 bg-gray-100 px-5 py-6 text-center text-base">
//             {t('text-no-delivery-time-found')}
//           </span>
//         </div>
//       )}
//     </div>
//   );
// };
// export default ScheduleGrid;





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
            label={t('apptoken')}
            {...register('email')}
            type="apptoken"
            variant="outline"
            className="mb-4"
            error={t(errors.email?.message!)}
          />
          <Input
            label={t('captchatoken')}
            {...register('email')}
            type="captchatoken"
            variant="outline"
            className="mb-4"
            error={t(errors.email?.message!)}
          />
          <Input
            label={t('id')}
            {...register('email')}
            type="id"
            variant="outline"
            className="mb-4"
            error={t(errors.email?.message!)}
          />
          <Input
            label={t('expiry date')}
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
