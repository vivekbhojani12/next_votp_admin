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
  .min(8, 'Password length should be 8 characters long')
  .test('uppercase', 'Password should contain at least one uppercase letter', (value: any) => {
    return /[A-Z]/.test(value);
  })
  .test('specialCharacter', 'Password should contain at least one special character', (value: any) => {
    return /[@$!%*?&]/.test(value);
  })
  .test('number', 'Password should contain at least one Number', (value: any) => {
    return /[0-9]/.test(value);
  })
});