import * as yup from 'yup';

export const TokenValidationSchema = yup.object().shape({
  no_id: yup
    .mixed() // Use .mixed() to allow custom validations
    .test('number', 'Number of Id should contain only Numbers', (value: any) => {
      return /[0-9]/.test(value);
    })
    .required('Number of ID is required'),
  name: yup
    .string()
    .required('Name is required'),
});