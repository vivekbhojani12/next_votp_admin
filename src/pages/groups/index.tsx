import React, { useEffect, useState } from 'react';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import PasswordInput from '@/components/ui/password-input';
import { useForm } from 'react-hook-form';
import Card from '@/components/common/card';
import Description from '@/components/ui/description';
import { useCreateTokenMutation } from '@/data/token';
import { useUsersQuery } from '@/data/user'
import { useTranslation } from 'next-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { typeValidationSchema } from '@/components/group/group-validation-schema';
// import { customerValidationSchema } from './user-validation-schema';
import { Permission } from '@/types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { adminOnly } from '@/utils/auth-utils';
import { GetStaticProps } from 'next';
import Layout from '@/components/layouts/admin';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type FormValues = {
  name: string;
  no_id: number;
  email: string;
  exp_date: Date;
  // password: string;
  // permission: Permission;
};

const defaultValues = {
  name: '',
  email: '',
  //   password: '',
};
export default function TypesPage() {
  console.log('TOKEN<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>');
  const { t } = useTranslation();
  const {
    data,
    mutate: registerUser,
    isLoading: loading,
  } = useCreateTokenMutation();
  const [response, setResponse] = useState<any>('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [emailList, setEmailList] = useState<string[]>([]);
  const handleDateChange = (date: Date | null) => {
    // Update the selected date state
    setSelectedDate(date);
  };

  const { users } = useUsersQuery({
    // limit: 20,
    // page,
    // name: searchTerm,
    // orderBy,
    // sortedBy,
  });
  console.log(users, 'Users<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
  const {
    register,
    handleSubmit,
    setError,

    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(typeValidationSchema),
  });

  async function onSubmit({ name, email, no_id, exp_date }: FormValues) {
    registerUser({
      exp_date,
      name,
      email,
      no_id,
    });
  }

  useEffect(() => {
    if (data) {
      setResponse(data);
    }
  }, [data]);

  useEffect(() => {
    // Fetch the list of email values from the "users" list
    const emails: string[] = users.map((user) => user.email);
    setEmailList(emails);

  }, [users]);
  const today = new Date().toISOString().split('T')[0];
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="main-panel">
        <div className="content">
          <h4 className="page-title">Create Token</h4>
          <div className="card Token-main-p">
            <div className="row pt-3 pr-3 pl-3 ">
              <div className="col-md-4 ">
                <div className="form-group">
                  <Input
                    label={t('Name')}
                    {...register('name')}
                    type="text"
                    variant="outline"
                    className=" name-ct"
                    error={t(errors.name?.message!)}
                  />
                </div>
              </div>
              {/* <div className="col-md-3 col-12">
                  <div className="form-group">
                    <Input
                      label={t('form:input-label-email')}
                      {...register('email')}
                      type="email"
                      variant="outline"
                      className="mb-4"
                      error={t(errors.email?.message!)}
                    />
                    <small
                      id="emailHelp"
                      className="form-text email-text text-muted"
                    >
                      This Email will be use for user search
                    </small>
                  </div>
                </div> */}
              <div className="col-md-4 ">
                <div className="form-group">
                  {/* Email Dropdown */}
                  <label className='tokan-label-email' htmlFor="email">Email</label>
                  <select
                    {...register('email', { required: 'Email is required' })}
                    className="form-control createtoken-email"
                  >
                    {/* Add default option for no selection */}
                    <option value="">Select an email</option>
                    {/* Dynamically generate options from the emailList */}
                    {emailList.map((email) => (
                      <option key={email} value={email}>
                        {email}
                      </option>
                    ))}
                  </select>
                  {/* Error message for the email field */}
                  {errors.email && <span className="text-danger">{errors.email.message}</span>}
                  <small id="emailHelp" className="form-text email-text text-muted">
                    This Email will be used for user search
                  </small>
                </div>
              </div>
              <div className="col-md-2">
                <div className="form-group">
                  <Input
                    label={t('No Id')}
                    {...register('no_id')}
                    type="no_id"
                    variant="outline"

                    error={t(errors.no_id?.message!)}
                  />
                </div>
              </div>
              <div className="col-md-2 ">
                <div className="form-group">
                  <label className='tokan-label-date' >Date</label>
                  <input
                    type="date"
                    {...register('exp_date', {
                      required: 'Date is required',
                    })}
                    min={today}
                    className="form-control createtoken-date"
                  />
                  {errors.exp_date && (
                    <span className="text-danger">
                      {errors.exp_date.message}
                    </span>
                  )}
                </div>
              </div>

            </div>
            <div className="token-from-button pr-3 text-right">
              <Button
                className="token-button"
                loading={loading}
                disabled={loading}
              >
                {t('Generate Token')}
              </Button>
            </div>
          </div>
          {console.log(response, '<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>')}
          {response?.email && (
            <div className="card token_gn_details">
              <div className="row">
                <div className="col-12">
                  <h4>Token Details:</h4>
                </div>
                <div className="col-12">
                  <table className="table-striped mt-3 table">
                    <tbody>
                      <tr>
                        <td className="td1">Name</td>
                        <td>{response?.name}</td>
                      </tr>
                      <tr>
                        <td className="td1">App Token</td>
                        <td>{response?.data?.token}</td>
                      </tr>
                      <tr>
                        <td className="td1">Login Captcha Token</td>
                        <td>57584FF8</td>
                      </tr>
                      <tr>
                        <td className="td1">Email Address</td>
                        <td>{response?.email}</td>
                      </tr>
                      <tr>
                        <td className="td1"> Account Expiry Date</td>
                        <td>{response?.data?.exp_date}</td>
                      </tr>
                      <tr>
                        <td className="td1">ID's</td>
                        <td>{response?.data?.no_id}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="text-right">
                    <a
                      href="/
                    "
                      className="btn btn-success"
                    >
                      Back to Dashboard
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}

TypesPage.authenticate = {
  permissions: adminOnly,
};

TypesPage.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ['table', 'common', 'form'])),
  },
});
