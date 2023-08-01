import React from 'react';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import PasswordInput from '@/components/ui/password-input';
import { useForm } from 'react-hook-form';
import Card from '@/components/common/card';
import Description from '@/components/ui/description';
import { useCreateTokenMutation } from '@/data/token';
import { useTranslation } from 'next-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
// import { customerValidationSchema } from './user-validation-schema';
import { Permission } from '@/types';
type FormValues = {
  name: string;
  no_id: number;
  email: string;
  
  // password: string;
  // permission: Permission;
};

const defaultValues = {
  name: '',
  email: '',
  //   password: '',
};
export default function Createtoken() {
  console.log("TOKEN<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>")
  const { t } = useTranslation();
  const { mutate: registerUser, isLoading: loading } = useCreateTokenMutation();

  const {
    register,
    handleSubmit,
    setError,

    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    // resolver: yupResolver(customerValidationSchema),
  });

  async function onSubmit({ name, email, no_id,exp_date }: FormValues) {
    registerUser(
      {exp_date,
        name,
        email,
        no_id,
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
    <div className="main-panel">
      <div className="content">
        <div className="container-fluid">
          <h4 className="page-title">Create Token</h4>
          <div className="card">
            <div className="row p-3">
              <div className="col-md-3 col-12">
                <div className="form-group">
                  <Input
                    label={t('form:input-label-name')}
                    {...register('name')}
                    type="text"
                    variant="outline"
                    className="mb-4"
                    error={t(errors.name?.message!)}
                  />
                </div>
              </div>
              <div className="col-md-3 col-12">
                <div className="form-group">
                  <Input
                    label={t('form:input-label-email')}
                    {...register('email')}
                    type="email"
                    variant="outline"
                    className="mb-4"
                    error={t(errors.email?.message!)}
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    This Email will be use for user search
                  </small>
                </div>
              </div>
              <div className="col-md-1 col-12">
                <div className="form-group">
                  <Input
                    label={t('form:input-label-email')}
                    {...register('no_id')}
                    type="no_id"
                    variant="outline"
                    className="mb-4"
                    error={t(errors.no_id?.message!)}
                  />
                </div>
              </div>
              <div className="col-md-3 col-12">
                <Button loading={loading} disabled={loading}>
                  {t('form:button-label-create-customer')}
                </Button>
              </div>
            </div>
          </div>

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
                      <td>User Name</td>
                    </tr>
                    <tr>
                      <td className="td1">App Token</td>
                      <td>D787D7</td>
                    </tr>
                    <tr>
                      <td className="td1">Login Captcha Token</td>
                      <td>57584FF8</td>
                    </tr>
                    <tr>
                      <td className="td1">Email Address</td>
                      <td>test@test.com</td>
                    </tr>
                    <tr>
                      <td className="td1"> Account Expiry Date</td>
                      <td>28-May-2023</td>
                    </tr>
                    <tr>
                      <td className="td1">ID's</td>
                      <td>10</td>
                    </tr>
                  </tbody>
                </table>
                <div className="text-right">
                  <a href="index.html" className="btn btn-success">
                    Back to Dashboard
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </form>
  );
}
