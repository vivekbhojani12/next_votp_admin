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
  token:
    yup
      .string()
      .matches(/^(?:[0-9]{6,}|[A-Z]{6,}|[A-Z0-9]{6,})$/, 'Token must be at least 6 characters and consist of either only numbers, only capital letters, or a combination of capital letters and numbers')
      .required('Token is required')
});

