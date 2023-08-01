import * as yup from 'yup';

export const customerValidationSchema = yup.object().shape({
  name: yup.string().required('form:error-name-required'),
  email: yup
    .string()
    .email('form:error-email-format')
    .required('form:error-email-required'),
  password: yup
    .string()
    .required('form:error-password-required')
    .min(8, 'Password length should be 8 character long length') // At least 8 characters long
    .matches(
      /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'Invalid Password'
    ), // Contains at least one uppercase letter and one special character
});