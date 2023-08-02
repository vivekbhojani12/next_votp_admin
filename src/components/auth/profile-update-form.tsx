import Input from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import Button from '@/components/ui/button';
import Description from '@/components/ui/description';
import Card from '@/components/common/card';
import { useUpdateUserMutation } from '@/data/user';
import TextArea from '@/components/ui/text-area';
import { useTranslation } from 'next-i18next';
import FileInput from '@/components/ui/file-input';
import pick from 'lodash/pick';
import SwitchInput from '@/components/ui/switch-input';
import Label from '@/components/ui/label';
import { adminOnly, getAuthCredentials, hasAccess } from '@/utils/auth-utils';
import { useRouter } from 'next/router'; // Step 1: Import the useRouter hook
import { useEffect } from 'react';
type FormValues = {
  // name: string;
  _id: string;
  // mobile:string,
  name: string;
  email: string;

  // first_name:string;
  // last_name:string;

  // profile: {
  //   id: string;
  //   bio: string;
  //   contact: string;
  //   avatar: {
  //     thumbnail: string;
  //     original: string;
  //     id: string;
  //   };
  //   notifications: {
  //     email: string;
  //     enable: boolean;
  //   };
  // };
};

export default function ProfileUpdate({ me }: any) {
  console.log(me, 'data<<<<<<>>>>>>>>>>>>>>>>>>')
  const { t } = useTranslation();
  const { mutate: updateUser, isLoading: loading } = useUpdateUserMutation();
  const { token } = getAuthCredentials();
  let permission = hasAccess(token);
  const router = useRouter(); // Step 1: Use the useRouter hook

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      ...(me &&
        pick(me?.data, [
          'name',
          // 'email',
          // 'mobile',
          // 'profile.avatar',
          // 'profile.notifications.email',
          // 'profile.notifications.enable',
        ])),
    },
  });
  const handleBackButtonClick = () => {
    router.back();
    reset() // Navigate back to the previous page
  };
  useEffect(() => {
    reset(me?.data)
  }, [me]);
  async function onSubmit(values: FormValues) {
    const { name } = values;
    // const { notifications } = profile;
    const input = {
      _id: me?.data?._id,
      name: name,

    };
    updateUser(input);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} onReset={handleBackButtonClick}>
      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Card className="mb-5 w-full ">
          <div className="row">
            <Input
              label={t('form:input-label-name')}
              {...register('name')}
              error={t(errors.name?.message!)}
              variant="outline"
              className="mb-5 col-md-6"
            />
            <Input
              label={t('Email')}
              {...register('email')}
              value={me?.data?.email}
              error={t(errors.email?.message!)}
              variant="outline"
              className="mb-5 col-md-6"
            />
          </div>

          <div className="w-full text-end">
            <Button className='save-button-profile' loading={loading} disabled={loading}>
              {t('form:button-label-save')}
            </Button>
          </div>
        </Card>

        <div className="w-full text-start mt-4">
          <Button className='back-button-profile' type="reset" variant="outline">
            {t('form:button-label-back')}
          </Button>
        </div>
      </div>
    </form>
  );
}
