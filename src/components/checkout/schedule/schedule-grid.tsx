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
import { tokenClient } from '@/data/client/Token';
// import { customerValidationSchema } from './user-validation-schema';
import { Permission } from '@/types';
import { useState, useEffect } from 'react';
import { DatePicker } from '@/components/ui/date-picker';
import { useRouter } from 'next/router';
import { TokenValidationSchema } from '@/components/user/edit-token.schema';
import { useUsersTokenQuery } from '@/data/user';
import { checkToken } from '@/data/token';

type FormValues = {
  name: string;
  _id: string;
  userId: string;
  token: string;
  balance: Number;
  exp_date: Date;
  no_id: number;
  captcha: string

};

const ScheduleGrid = ({ data, users }: any) => {
  const router = useRouter();
  const defaultValues = {
    userId: data?.data?.userId,
    token: data?.data?.token,
    no_id: data?.data?.no_id,
    name: data?.data?.name,
    exp_date: data?.data?.exp_date,
    captcha: data?.data?.captcha,
    balance: data?.data?.balance,
  };
  const { t } = useTranslation();
  const { mutate: updateToken, isLoading: loading } = useUpdateTOkenMutation();
  const { total_users } = useUsersTokenQuery({});


  const [startDate, setStartDate] = useState<any>(new Date(data?.data?.exp_date))
  const [token, setToken] = useState(data?.data?.token);
  const [tokenError, setTokenError] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [error, setErrors] = useState('')

  const newExpirationDate = new Date();  // Current date
  const newDate = new Date(newExpirationDate);  // Create a new Date object to avoid modifying the original date
  newDate.setDate(newExpirationDate.getDate() + 28)

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
    if (!isChecked) {

      // Update the startDate after 28 days
      setStartDate(newDate);
    }
    else {
      setStartDate(new Date(data?.data?.exp_date) as any)
    }

  };
  console.log(total_users)



  // const currentDate = new Date()
  const currentDate = new Date();
  const nextDay = new Date(currentDate);
  nextDay.setDate(currentDate.getDate() + 1);

  console.log(nextDay);

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
      name: data?.data?.name,
      token: data?.data?.token,
      no_id: data?.data?.no_id,
      balance: data?.data?.balance,
      exp_date: data?.data?.exp_date,
      captcha: data?.data?.captcha
    });
    setStartDate(new Date(data?.data?.exp_date));
  }, [data]);

  const handleBackButtonClick = () => {
    router.back();
  };

  // const handleTokenChange = (event: any) => {
  //   const newToken = event.target.value;
  //   console.log(newToken)

  //   try {
  //     // Make an API call to validate the token
  //     const response = checkToken(newToken);
  //     console.log('the value before')
  //     console.log(response, 'the value of response<<<<<<<<<<>>>>>>>')
  //     if (response) {
  //       setTokenError('Token already exists.');
  //     } else {
  //       setTokenError('');
  //     }
  //   } catch (error) {
  //     console.error('Error validating token:', error);
  //     setTokenError('Error validating token.');
  //   }

  //   // setToken(newToken);
  // };


  const handleTokenChange = (event: any) => {
    setToken(event.target.value);
  };

  useEffect(() => {
    const validateToken = async () => {
      try {
        // Make an API call to validate the token
        const response = await tokenClient.checkToken(token);
        console.log('the value of response:', response);

        if (response.data && response.data.token !== data?.data?.token) {
          setTokenError('Token already exists.');
        } else {
          setTokenError('');
        }
      } catch (error) {
        console.log(error)
        console.error('Error validating token:', error);
        setTokenError('Error validating token.');
      }
    };

    if (token) {
      validateToken();
    }
  }, [token]);

  async function onSubmit(values: FormValues) {
    const { userId, no_id, name, token, balance } = values;
    if (errors.userId) {
      console.error('Form has validation errors for userId:', errors.userId.message);
      // Optionally, you can handle the error, display a message, or perform other actions
      return;  // Return early if there are errors
    }
    // const { notifications } = profile;
    const input = {
      _id: data?.data?._id,
      userId: userId,
      token: token,
      name: name,
      no_id: no_id,
      balance: balance,
      exp_date: startDate ? startDate : null,
    };
    if (error === '') {
      updateToken(input);

    }
  }
  // const [error, setErrorr] = useState('');

  const handleUserIdChange = (event: any) => {
    const selectedUserId = event.target.value;
    console.log(selectedUserId)
    console.log(total_users)
    // Check if the selected user ID already exists in total_users
    const userExists = total_users.some(user => user.userId?._id === selectedUserId);

    if (userExists && selectedUserId !== data?.data?.userId) {
      // setError('userId', {
      //   type: 'manual',
      //   message: 'Warning!!!!! Email already exists. Please choose a different email.',
      // });
      setErrors('Warning!!!!! Email already exists. Please choose a different email.')
    }
    else {
      setErrors('');
      // Your form submission logic here
    }
  };



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
              <select
                {...register('userId', { required: 'Please select an Email.' })}
                className="mb-4 users-edit-from w-full"
                defaultValue={''}
                onChange={handleUserIdChange}
              >
                <option value="" disabled>
                  Select an email
                </option>
                {users.map((user: any, index: any) => (
                  <option key={index} value={user._id}>
                    {user.email}
                  </option>
                ))}
              </select>
              {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>

            <Input
              label={t('Name')}
              {...register('name')}
              type="name"
              variant="outline"
              className="mb-4"
              error={t(errors.name?.message!)}
            />
            <Input
              label={t('App Token')}
              {...register('token')}
              type="apptoken"
              // value={data?.data?.token}
              variant="outline"
              className="mb-4"
              value={token}
              error={t(errors.token?.message!) || tokenError}
              onChange={handleTokenChange}
            // error={t(errors.token?.message!)}
            />
            <Input
              label={t('Captcha')}
              {...register('captcha')}
              type="captcha"
              // value={data?.data?.token}
              variant="outline"
              className="mb-4"
              value={data?.data?.captcha}
            // error={t(errors.token?.message!)}
            />
            <Input
              label={t('No Id')}
              {...register('no_id')}
              type="no id"
              variant="outline"
              className="mb-4"
              error={t(errors.no_id?.message!)}
            />
            <Input
              label={t('Balance')}
              {...register('balance')}
              type="no id"
              variant="outline"
              className="mb-4"
              error={t(errors.balance?.message!)}
            />
            <div className="mb-3">
              <input
                type="checkbox"
                className="checkbox-devic"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <label className="devics-check"><b>1 month</b></label>
            </div>
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
          <div className='col-md-6 col-6'>
            <Button className=" color-button-back" type="reset" variant="outline">
              {t('form:button-label-back')}
            </Button>
          </div>
          <div className='text-end col-6  col-md-6'>
            <Button
              className="color-button-users  "
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




// <div>
//               <div><label><b>Select Email</b> </label></div>
//               <div>
//                 <select
//                   {...register('userId', { required: 'Please select a Email.' })}
//                   className="mb-4 users-edit-from w-full"
//                   defaultValue={''}
//                 >
//                   <option value="" disabled>
//                     Select an email
//                   </option>
//                   {/* Assuming you have an array of user objects with email and user_id */}
//                   {users.map((user: any, index: any) => (
//                     <option key={index} value={user._id}>
//                       {user.email}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>