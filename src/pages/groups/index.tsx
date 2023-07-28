import React, { useEffect, useState } from 'react';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import PasswordInput from '@/components/ui/password-input';
import { useForm } from 'react-hook-form';
import Card from '@/components/common/card';
import Description from '@/components/ui/description';
import { useCreateTokenMutation } from '@/data/token';
import { useTranslation } from 'next-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import {typeValidationSchema} from '/home/strivedge/Documents/Farnaz/NextJs/VOTP/next_votp_admin/src/components/group/group-validation-schema'
// import { customerValidationSchema } from './user-validation-schema';
import { Permission } from '@/types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { adminOnly } from '@/utils/auth-utils';
import { GetStaticProps } from 'next';
import Layout from '@/components/layouts/admin';
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
export default function TypesPage() {
  console.log('TOKEN<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>');
  const { t } = useTranslation();
  const { data, mutate: registerUser, isLoading: loading } = useCreateTokenMutation();
  const [response, setResponse] = useState<any>('')
  const {
    register,
    handleSubmit,
    setError,

    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(typeValidationSchema),
  });


  async function onSubmit({ name, email, no_id }: FormValues) {
    registerUser(
      {
        name,
        email,
        no_id,
        // permission: Permission.StoreOwner,
      }
      // ,
      // {
      //   onError: (error: any) => {
      //     console.log(error,'error')
      //     Object.keys(error?.response?.data).forEach((field: any) => {
      //       setError(field, {
      //         type: 'manual',
      //         message: error?.response?.data[field][0],
      //       });
      //     });
      //   },
      // },
    );
  }

  useEffect(() => {
    if (data) {
      console.log(data,'the value of data')
      setResponse(data);
    }
  }, [data]);


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
                      label={t('Name')}
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
                      label={t('form:input-label-no_id')}
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

            {response?.email&&<div className="card token_gn_details">
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
                    <a href="/
                    " className="btn btn-success">
                      Back to Dashboard
                    </a>
                  </div>
                </div>
              </div>
            </div>}
          </div>
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