import { useState } from 'react';
import Alert from '@/components/ui/alert';
import {
  useForgetPasswordMutation,
  useVerifyForgetPasswordTokenMutation,
  useResetPasswordMutation,
  useVerifyOtpMutation
} from '@/data/user';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import { useTranslation } from 'next-i18next';

const EnterEmailView = dynamic(() => import('./enter-email-view'));
const EnterTokenView = dynamic(() => import('./enter-token-view'));
const EnterOtpView = dynamic(() => import('./enter-otp-view'));
const EnterNewPasswordView = dynamic(() => import('./enter-new-password-view'));

const ForgotPassword = () => {
  const { t } = useTranslation();
  const { mutate: forgetPassword, isLoading } = useForgetPasswordMutation();
  const { mutate: verifyOtp , isLoading: verifyingOtp } = useVerifyOtpMutation();
  const { mutate: verifyToken, isLoading: verifying } =
    useVerifyForgetPasswordTokenMutation();
  const { mutate: resetPassword, isLoading: resetting } =
    useResetPasswordMutation();
  const [errorMsg, setErrorMsg] = useState<string | null | undefined>('');
  const [verifiedEmail, setVerifiedEmail] = useState('');
  const [verifiedOtp, setVerifiedOtp] = useState('');
  const [verifiedToken, setVerifiedToken] = useState('');

  function handleEmailSubmit({ email }: { email: string }) {
    forgetPassword(
      {
        email,
      },
      {
        onSuccess: (data) => {
          if (data) {
            setVerifiedEmail(email);
          } else {
            setErrorMsg(data?.message);
          }
        },
      }
    );
  }


  function handleOtpSubmit({ otp }: { otp: string }) {
    verifyOtp(
      {email: verifiedEmail,
        otp,
      },
      {
        onSuccess: (data) => {
          if (data) {
            setVerifiedOtp(otp);
          } else {
            setErrorMsg(data?.message);
          }
        },
      }
    );
  }


  function handleTokenSubmit({ token }: { token: string }) {
    verifyToken(
      {
        email: verifiedEmail,
        token,
      },
      {
        onSuccess: (data) => {
          if (data?.flag===true) {
            setVerifiedToken(token);
          } else {
            setErrorMsg(data?.message);
          }
        },
      }
    );
  }

  function handleResetPassword({ password }: { password: string }) {
    resetPassword(
      {
        email: verifiedEmail,
        // token: verifiedToken,
        password,
      },
      {
        onSuccess: (data) => {
          if (data?.flag===true) {
            Router.push('/');
          } else {
            setErrorMsg(data?.message);
          }
        },
      }
    );
  }

  return (
    <>
      {errorMsg && (
        <Alert
          variant="error"
          message={t(`common:${errorMsg}`)}
          className="mb-6"
          closeable={true}
          onClose={() => setErrorMsg('')}
        />
      )}
      {!verifiedEmail && (
        <EnterEmailView loading={isLoading} onSubmit={handleEmailSubmit} />
      )}
       {verifiedEmail && !verifiedOtp && !verifiedToken&& (
        <EnterOtpView loading={verifyingOtp} onSubmit={handleOtpSubmit} />
      )}
      {verifiedEmail && !verifiedToken &&verifiedOtp&&  (
        <EnterTokenView loading={verifying} onSubmit={handleTokenSubmit} />
      )}
      {verifiedEmail && verifiedToken && (
        <EnterNewPasswordView
          loading={resetting}
          onSubmit={handleResetPassword}
        />
      )}
    </>
  );
};

export default ForgotPassword;
