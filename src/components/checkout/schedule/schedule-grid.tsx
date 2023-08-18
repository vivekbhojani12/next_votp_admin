// // import { RadioGroup } from '@headlessui/react';
// // import { useAtom } from 'jotai';
// // import ScheduleCard from './schedule-card';
// // import { deliveryTimeAtom } from '@/contexts/checkout';
// // import { useEffect } from 'react';
// // import { useTranslation } from 'next-i18next';
// // import { useSettings } from '@/contexts/settings.context';

// //   async function onSubmit({ name, email, password }: FormValues) {
// //     registerUser(
// //       {
// //         name,
// //         // mobile,
// //         email,
// //         password,
// //         // permission: Permission.StoreOwner,
// //       },
// //       {
// //         onError: (error: any) => {
// //           Object.keys(error?.response?.data).forEach((field: any) => {
// //             setError(field, {
// //               type: 'manual',
// //               message: error?.response?.data[field][0],
// //             });
// //           });
// //         },
// //       }
// //     );
// //   }
// //   return (
// //     <form onSubmit={handleSubmit(onSubmit)} noValidate>
// //       <div className="my-5 flex flex-wrap sm:my-8">

// //         <Card className="w-full ">
// //           <Input
// //             label={t('form:input-label-name')}
// //             {...register('name')}
// //             type="text"
// //             variant="outline"
// //             className="mb-4"
// //             error={t(errors.name?.message!)}
// //           />

// //           <Input
// //             label={t('form:input-label-email')}
// //             {...register('email')}
// //             type="email"
// //             variant="outline"
// //             className="mb-4"
// //             error={t(errors.email?.message!)}
// //           />
// //           <Input
// //             label={t('App Tken')}
// //             {...register('email')}
// //             type="apptoken"
// //             variant="outline"
// //             className="mb-4"
// //             error={t(errors.email?.message!)}
// //           />
// //           <Input
// //             label={t('Captcha Token')}
// //             {...register('email')}
// //             type="captchatoken"
// //             variant="outline"
// //             className="mb-4"
// //             error={t(errors.email?.message!)}
// //           />
// //           <Input
// //             label={t('ID')}
// //             {...register('email')}
// //             type="id"
// //             variant="outline"
// //             className="mb-4"
// //             error={t(errors.email?.message!)}
// //           />
// //           <Input
// //             label={t('Expiry Date')}
// //             {...register('email')}
// //             type="expirydate"
// //             variant="outline"
// //             className="mb-4"
// //             error={t(errors.email?.message!)}
// //           />
// //           <div className="text-end">
// //             <Button className='color-button-users' loading={loading} disabled={loading}>
// //               {t('form:button-label-create-customer')}
// //             </Button>
// //           </div>

// //         </Card>
// //       </div>

// //     </form>
// //   );
// // };
// // export default ScheduleGrid;

import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import Select from '@/components/ui/select/select';
import PasswordInput from '@/components/ui/password-input';
import { useForm } from 'react-hook-form';
import Card from '@/components/common/card';
import Description from '@/components/ui/description';
import { useUpdateTOkenMutation } from '@/data/user';
import { useTranslation } from 'next-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
// import { customerValidationSchema } from './user-validation-schema';
import { Permission } from '@/types';
import { useState, useEffect } from 'react';
import { DatePicker } from '@/components/ui/date-picker';
import { useRouter } from 'next/router';
import { TokenValidationSchema } from '@/components/user/edit-token.schema';

type FormValues = {
  // name: string;
  _id: string;
  userId: string;
  token: string;
  exp_date: Date;
  no_id: Number;

};

const ScheduleGrid = ({ data, users }: any) => {
  const router = useRouter();
  const defaultValues = {
    userId: data?.data?.userId,
    token: data?.data?.token,
    no_id: data?.data?.no_id,
    exp_date: data?.data?.exp_date,
  };
  const { t } = useTranslation();
  const { mutate: updateToken, isLoading: loading } = useUpdateTOkenMutation();

  const [startDate, setStartDate] = useState<any>(new Date(data?.data?.exp_date))

  const currentDate = new Date()

  const {
    reset,
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(TokenValidationSchema),
  });

  useEffect(() => {
    reset({
      userId: data?.data?.userId,
      token: data?.data?.token,
      no_id: data?.data?.no_id,
      exp_date: data?.data?.exp_date,
    });
    setStartDate(new Date(data?.data?.exp_date));
  }, [data]);

  const handleBackButtonClick = () => {
    router.back();
  };
  async function onSubmit(values: FormValues) {
    const { userId, no_id } = values;
    // const { notifications } = profile;
    const input = {
      _id: data?.data?._id,
      userId: userId,
      token: data?.data?.token,
      no_id: no_id,
      exp_date: startDate ? startDate : null,
    };
    updateToken(input);
  }


  return (
    <>
      <div className="flex  border-border-base ">
        <h1 className="text-lg font-semibold text-heading">
          {t('form:form-title-users-edit')}
        </h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} onReset={handleBackButtonClick}>
        <div className="UsersDetails-from flex flex-wrap">
          <Card className="w-full users-from-bg ">
            <div>
              <div><label><b>Select Email</b> </label></div>
              <div>
                <select
                  {...register('userId', { required: 'Please select a Email.' })}
                  className="mb-4 users-edit-from w-full"
                  defaultValue={''}
                >
                  <option value="" disabled>
                    Select an email
                  </option>
                  {/* Assuming you have an array of user objects with email and user_id */}
                  {users.map((user: any, index: any) => (
                    <option key={index} value={user._id}>
                      {user.email}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <Input
              label={t('App Token')}
              {...register('token')}
              type="apptoken"
              value={data?.data?.token}
              variant="outline"
              className="mb-4"
              error={t(errors.token?.message!)}
            />
            <Input
              label={t('No Id')}
              {...register('no_id')}
              type="no id"
              variant="outline"
              className="mb-4"
              error={t(errors.no_id?.message!)}
            />
            {data && startDate !== null && data?.data?.exp_date !== null && <div >
              <div><label><b>Expiry Date</b> </label></div>
              <DatePicker
                selected={startDate}
                minDate={currentDate}
                onChange={(date) => setStartDate(date)} // Use the correct way to update the startDate state
                // dateFormat="yyyy-MM-dd" // Set the desired date format for the DatePicker
                className="form-control users-date-from" />
            </div>}

          </Card>
        </div>
        <div className="row  ">
          <div className='col-md-6'>
            <Button className=" color-button-back" type="reset" variant="outline">
              {t('form:button-label-back')}
            </Button>
          </div>
          <div className='text-end  col-md-6'>
            <Button
              className="color-button-users "
              loading={loading}
              disabled={loading}
            >
              {t('Update Token')}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default ScheduleGrid;




