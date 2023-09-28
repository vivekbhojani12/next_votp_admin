import * as yup from 'yup';

export const TokenValidationSchema = yup.object().shape({
  no_id: yup
    .mixed() // Use .mixed() to allow custom validations
    .test('numbers-only', 'Number of ID should contain only numbers', (value) => {
      return /^\d+$/.test(value);
    })
    .required('Number of ID is required'),
  name: yup
    .string()
    .required('Name is required'),
    token: yup
    .string()
    .matches(/^(?=.*[a-zA-Z])(?=.*\d).{6,}$/, 'Token must be at least 6 characters and contain both letters and numbers')
    .required('Token is required'),
});