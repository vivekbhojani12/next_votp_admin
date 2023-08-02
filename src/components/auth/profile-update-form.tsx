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
  _id:string;
  // mobile:string,
  name:string;
  email:string;

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
  console.log(me,'data<<<<<<>>>>>>>>>>>>>>>>>>')
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
    const {name} = values;
    // const { notifications } = profile;
    const input = {
      _id: me?.data?._id,
      name:name,
      // mobile:mobile,
      // first_name:first_name,
      // last_name:last_name,
      // input: {
      //   name: name,
      //   profile: {
      //     id: me?.profile?.id,
      //     bio: profile?.bio,
      //     contact: profile?.contact,
      //     avatar: {
      //       thumbnail: profile?.avatar?.thumbnail,
      //       original: profile?.avatar?.original,
      //       id: profile?.avatar?.id,
      //     },
      //     notifications: {
      //       ...notifications,
      //     },
      //   },
      // },
    };
    updateUser(input);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} onReset={handleBackButtonClick}>
      {/* <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title={t('form:input-label-avatar')}
          details={t('form:avatar-help-text')}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <FileInput name="profile.avatar" control={control} multiple={false} />
        </Card>
      </div> */}
      {/* {permission ? ( */}
        {/* <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
          <Description
            title={t('form:form-notification-title')}
            details={t('form:form-notification-description')}
            className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
          />

          <Card className="mb-5 w-full sm:w-8/12 md:w-2/3">
            <Input
              label={t('form:input-notification-email')}
              {...register('profile.notifications.email')}
              error={t(errors?.profile?.notifications?.email?.message!)}
              variant="outline"
              className="mb-5"
              type="email"
            />
            <div className="flex items-center gap-x-4">
              <SwitchInput
                name="profile.notifications.enable"
                control={control}
              />
              <Label className="mb-0">
                {t('form:input-enable-notification')}
              </Label>
            </div>
          </Card>
        </div>
      ) : (
        ''
      )} */}
      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Card className="mb-5 w-full">
        <Input
            label={t('form:input-label-name')}
            {...register('name')}
            error={t(errors.name?.message!)}
            variant="outline"
            className="mb-5"
          />
          <Input
            label={t('Email')}
            {...register('email')}
            value={me?.data?.email}
            error={t(errors.email?.message!)}
            variant="outline"
            className="mb-5"
          />
          {/* <Input
            label={t('form:input-label-name')}
            {...register('name')}
            error={t(errors.name?.message!)}
            variant="outline"
            className="mb-5"
          /> */}
          {/* <Input
            label={t('Mobile')}
            {...register('mobile')}
            error={t(errors.mobile?.message!)}
            variant="outline"
            className="mb-5"
          /> */}
          {/* <TextArea
            label={t('form:input-label-bio')}
            {...register('profile.bio')}
            error={t(errors.profile?.bio?.message!)}
            variant="outline"
            className="mb-6"
          /> */}
          {/* <Input
            label={t('form:input-label-contact')}
            {...register('profile.contact')}
            error={t(errors.profile?.contact?.message!)}
            variant="outline"
            className="mb-5"
          /> */}
           <div className="w-full text-end">
          <Button className='settings-colo-profile' loading={loading} disabled={loading}>
            {t('form:button-label-save')}
          </Button>
        </div>
        </Card>
       
        <div className="w-full text-start mt-4">
        <Button type="reset" variant="outline">
          {t('form:button-label-back')}
        </Button>
      </div>
      </div>
    </form>
  );
}
